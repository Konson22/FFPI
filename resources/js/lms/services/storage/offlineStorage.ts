/**
 * Offline Storage Service for LMS
 * Uses localStorage for web (namespaced to LMS module)
 */

import { safeJsonParse } from '../../../core/lms/utils';

const LMS_STORAGE_PREFIX = 'lms_';

/**
 * Storage interface
 */
export interface LmsStorage {
  getItem<T = any>(key: string): T | null;
  setItem<T = any>(key: string, value: T): void;
  removeItem(key: string): void;
  clear(): void;
  getAllKeys(): string[];
}

/**
 * Web Storage Implementation (localStorage)
 */
class WebStorage implements LmsStorage {
  private prefix: string;

  constructor(prefix: string = LMS_STORAGE_PREFIX) {
    this.prefix = prefix;
  }

  private getFullKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  getItem<T = any>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getFullKey(key));
      if (!item) return null;
      return safeJsonParse<T>(item);
    } catch (error) {
      console.error(`[LMS Storage] Error getting item ${key}:`, error);
      return null;
    }
  }

  setItem<T = any>(key: string, value: T): void {
    try {
      localStorage.setItem(this.getFullKey(key), JSON.stringify(value));
    } catch (error) {
      console.error(`[LMS Storage] Error setting item ${key}:`, error);
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(this.getFullKey(key));
    } catch (error) {
      console.error(`[LMS Storage] Error removing item ${key}:`, error);
    }
  }

  clear(): void {
    try {
      const keys = this.getAllKeys();
      keys.forEach(key => this.removeItem(key));
    } catch (error) {
      console.error('[LMS Storage] Error clearing storage:', error);
    }
  }

  getAllKeys(): string[] {
    try {
      const allKeys = Object.keys(localStorage);
      return allKeys
        .filter(key => key.startsWith(this.prefix))
        .map(key => key.substring(this.prefix.length));
    } catch (error) {
      console.error('[LMS Storage] Error getting all keys:', error);
      return [];
    }
  }
}

/**
 * Singleton storage instance
 */
export const lmsStorage = new WebStorage();

/**
 * Download Manager for Offline Content
 */
export interface DownloadProgress {
  lessonId: string | number;
  progress: number; // 0-100
  status: 'pending' | 'downloading' | 'completed' | 'error';
  error?: string;
}

class DownloadManager {
  private downloads: Map<string | number, DownloadProgress> = new Map();
  private listeners: Set<(progress: DownloadProgress) => void> = new Set();

  constructor() {
    this.loadDownloadsFromStorage();
  }

  private loadDownloadsFromStorage() {
    const stored = lmsStorage.getItem<Record<string, DownloadProgress>>('downloads');
    if (stored) {
      Object.entries(stored).forEach(([lessonId, progress]) => {
        this.downloads.set(lessonId, progress);
      });
    }
  }

  private saveToStorage() {
    const downloads: Record<string, DownloadProgress> = {};
    this.downloads.forEach((progress, lessonId) => {
      downloads[lessonId.toString()] = progress;
    });
    lmsStorage.setItem('downloads', downloads);
  }

  /**
   * Start downloading a lesson
   */
  async downloadLesson(lessonId: string | number, mediaUrl: string): Promise<void> {
    const progress: DownloadProgress = {
      lessonId,
      progress: 0,
      status: 'downloading',
    };

    this.downloads.set(lessonId, progress);
    this.notifyListeners(progress);

    try {
      // For web, we'll use fetch with progress tracking
      const response = await fetch(mediaUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      const contentLength = Number(response.headers.get('Content-Length'));

      if (!reader) {
        throw new Error('ReadableStream not supported');
      }

      let receivedLength = 0;
      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        receivedLength += value.length;

        // Update progress
        if (contentLength) {
          progress.progress = Math.round((receivedLength / contentLength) * 100);
          this.downloads.set(lessonId, { ...progress });
          this.notifyListeners(progress);
        }
      }

      // Combine chunks
      const blob = new Blob(chunks);
      const objectUrl = URL.createObjectURL(blob);

      // Store the blob URL
      lmsStorage.setItem(`download_${lessonId}`, {
        url: objectUrl,
        size: receivedLength,
        downloadedAt: new Date().toISOString(),
      });

      // Mark as completed
      progress.status = 'completed';
      progress.progress = 100;
      this.downloads.set(lessonId, progress);
      this.notifyListeners(progress);
      this.saveToStorage();
    } catch (error) {
      progress.status = 'error';
      progress.error = error instanceof Error ? error.message : 'Download failed';
      this.downloads.set(lessonId, progress);
      this.notifyListeners(progress);
      this.saveToStorage();
      throw error;
    }
  }

  /**
   * Get download progress
   */
  getProgress(lessonId: string | number): DownloadProgress | null {
    return this.downloads.get(lessonId) || null;
  }

  /**
   * Get local URL for downloaded content
   */
  getLocalUrl(lessonId: string | number): string | null {
    const download = lmsStorage.getItem<{ url: string }>(`download_${lessonId}`);
    return download?.url || null;
  }

  /**
   * Remove downloaded content
   */
  removeDownload(lessonId: string | number): void {
    const download = lmsStorage.getItem<{ url: string }>(`download_${lessonId}`);
    if (download?.url) {
      URL.revokeObjectURL(download.url);
    }
    lmsStorage.removeItem(`download_${lessonId}`);
    this.downloads.delete(lessonId);
    this.saveToStorage();
  }

  /**
   * Subscribe to download progress updates
   */
  subscribe(listener: (progress: DownloadProgress) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(progress: DownloadProgress) {
    this.listeners.forEach(listener => listener(progress));
  }
}

/**
 * Singleton download manager
 */
export const downloadManager = new DownloadManager();

/**
 * Progress Queue for Offline Sync
 */
interface QueuedProgress {
  courseId: string | number;
  lessonId: string | number;
  pct: number;
  completed?: boolean;
  timeSpent?: number;
  timestamp: number;
}

class ProgressQueue {
  private queue: QueuedProgress[] = [];
  private readonly QUEUE_KEY = 'progress_queue';

  constructor() {
    this.loadQueue();
  }

  private loadQueue() {
    const stored = lmsStorage.getItem<QueuedProgress[]>(this.QUEUE_KEY);
    if (stored) {
      this.queue = stored;
    }
  }

  private saveQueue() {
    lmsStorage.setItem(this.QUEUE_KEY, this.queue);
  }

  /**
   * Add progress update to queue
   */
  enqueue(progress: Omit<QueuedProgress, 'timestamp'>): void {
    this.queue.push({
      ...progress,
      timestamp: Date.now(),
    });
    this.saveQueue();
  }

  /**
   * Get all queued items
   */
  getAll(): QueuedProgress[] {
    return [...this.queue];
  }

  /**
   * Remove item from queue
   */
  dequeue(item: QueuedProgress): void {
    const index = this.queue.findIndex(
      q => q.lessonId === item.lessonId && q.timestamp === item.timestamp
    );
    if (index !== -1) {
      this.queue.splice(index, 1);
      this.saveQueue();
    }
  }

  /**
   * Clear all queued items
   */
  clear(): void {
    this.queue = [];
    this.saveQueue();
  }

  /**
   * Get queue size
   */
  size(): number {
    return this.queue.length;
  }
}

/**
 * Singleton progress queue
 */
export const progressQueue = new ProgressQueue();

