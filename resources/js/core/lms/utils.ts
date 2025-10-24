/**
 * LMS Module Utilities
 * Helper functions used exclusively by the LMS module
 */

export type ID = string | number;

/**
 * Format duration in seconds to readable string
 * @example formatDuration(3665) => "1h 1m 5s"
 */
export const formatDuration = (seconds: number | null | undefined): string => {
  // Handle invalid input
  if (!seconds || isNaN(seconds) || seconds <= 0) {
    return 'N/A';
  }
  
  const totalSeconds = Math.floor(seconds);
  
  if (totalSeconds < 60) return `${totalSeconds}s`;
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  
  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
  
  return parts.join(' ');
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

/**
 * Calculate XP level from total XP
 * Uses a simple logarithmic curve: level = floor(log2(xp/100)) + 1
 */
export const calculateLevel = (totalXP: number): number => {
  if (totalXP < 100) return 1;
  return Math.floor(Math.log2(totalXP / 100)) + 1;
};

/**
 * Calculate XP needed for next level
 */
export const xpForNextLevel = (currentLevel: number): number => {
  return Math.pow(2, currentLevel - 1) * 100;
};

/**
 * Check if device is online
 */
export const isOnline = (): boolean => {
  return navigator.onLine;
};

/**
 * Format file size to human readable
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

/**
 * Safe JSON parse that returns null on error
 */
export const safeJsonParse = <T = any>(json: string): T | null => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
};

/**
 * Deep clone an object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Generate a unique ID (simple version)
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get asset URL from storage path
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `/storage/${path}`;
};

/**
 * Sanitize HTML content (basic)
 */
export const sanitizeHtml = (html: string): string => {
  const temp = document.createElement('div');
  temp.textContent = html;
  return temp.innerHTML;
};

