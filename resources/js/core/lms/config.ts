/**
 * LMS Module Configuration
 * Isolated configuration that reads from environment safely
 * Falls back to defaults if values are missing - never crashes the app
 */

export interface LmsConfig {
  enabled: boolean;
  adapter: 'mvp' | 'moodle';
  features: {
    offline: boolean;
    gamification: boolean;
    analytics: boolean;
  };
  moodle?: {
    baseUrl: string;
    token: string;
  };
  media: {
    disk: string;
    downloadsPath: string;
  };
}

/**
 * Safe environment reader
 * Returns undefined if variable doesn't exist, never throws
 */
const getEnv = (key: string, defaultValue?: string): string | undefined => {
  try {
    // @ts-ignore - import.meta.env is provided by Vite
    return import.meta.env?.[key] ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * Parse boolean from environment string
 */
const parseBool = (value: string | undefined, defaultValue = false): boolean => {
  if (!value) return defaultValue;
  return ['true', '1', 'yes', 'on'].includes(value.toLowerCase());
};

/**
 * LMS Configuration Instance
 * Safe to import even if LMS is disabled
 */
export const lmsConfig: LmsConfig = {
  enabled: parseBool(getEnv('VITE_LMS_ENABLE'), false),
  adapter: (getEnv('VITE_LMS_ADAPTER', 'mvp') as 'mvp' | 'moodle'),
  features: {
    offline: parseBool(getEnv('VITE_LMS_OFFLINE_ENABLED'), true),
    gamification: parseBool(getEnv('VITE_LMS_GAMIFICATION_ENABLED'), true),
    analytics: parseBool(getEnv('VITE_LMS_ANALYTICS_ENABLED'), true),
  },
  moodle: {
    baseUrl: getEnv('VITE_MOODLE_BASE_URL', ''),
    token: getEnv('VITE_MOODLE_TOKEN', ''),
  },
  media: {
    disk: getEnv('VITE_LMS_MEDIA_DISK', 'public'),
    downloadsPath: getEnv('VITE_LMS_DOWNLOADS_PATH', 'lms/downloads'),
  },
};

/**
 * Check if LMS module is enabled
 * Use this guard before initializing any LMS features
 */
export const isLmsEnabled = (): boolean => {
  return lmsConfig.enabled;
};

/**
 * Get current adapter type
 */
export const getLmsAdapter = (): 'mvp' | 'moodle' => {
  return lmsConfig.adapter;
};

/**
 * Check if a specific feature is enabled
 */
export const isFeatureEnabled = (feature: keyof LmsConfig['features']): boolean => {
  return lmsConfig.enabled && lmsConfig.features[feature];
};

