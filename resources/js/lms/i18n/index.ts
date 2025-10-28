/**
 * LMS Internationalization Setup
 * Supports English (en) and Arabic (ar-JUBA)
 */

import { isLmsEnabled } from '../../core/lms/config';
import en from './locales/en.json';
import arJuba from './locales/ar-JUBA.json';

/**
 * Locale type
 */
export type LmsLocale = 'en' | 'ar-JUBA';

/**
 * Translation keys (automatically inferred from en.json)
 */
export type TranslationKey = keyof typeof en;

/**
 * LMS i18n Manager
 */
class LmsI18n {
  private currentLocale: LmsLocale = 'en';
  private translations: Record<LmsLocale, any> = {
    en,
    'ar-JUBA': arJuba,
  };
  private listeners: Set<(locale: LmsLocale) => void> = new Set();

  constructor() {
    // Load saved locale from storage
    const saved = localStorage.getItem('lms_locale');
    if (saved && this.isValidLocale(saved)) {
      this.currentLocale = saved as LmsLocale;
    }
  }

  /**
   * Get current locale
   */
  getLocale(): LmsLocale {
    return this.currentLocale;
  }

  /**
   * Set locale
   */
  setLocale(locale: LmsLocale): void {
    if (!this.isValidLocale(locale)) {
      console.warn(`[LMS i18n] Invalid locale: ${locale}`);
      return;
    }

    this.currentLocale = locale;
    localStorage.setItem('lms_locale', locale);
    
    // Update document direction for RTL
    if (locale === 'ar-JUBA') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }

    // Notify listeners
    this.listeners.forEach(listener => listener(locale));
  }

  /**
   * Translate a key (supports nested keys like 'common.loading')
   */
  t(key: string, params?: Record<string, string | number>): string {
    const locale = this.currentLocale;
    
    // Handle nested keys (e.g., 'common.loading')
    const keys = key.split('.');
    let translation: any = this.translations[locale];
    
    for (const k of keys) {
      if (translation && typeof translation === 'object') {
        translation = translation[k];
      } else {
        translation = undefined;
        break;
      }
    }

    // Fallback to English if not found
    if (!translation) {
      let fallback: any = this.translations.en;
      for (const k of keys) {
        if (fallback && typeof fallback === 'object') {
          fallback = fallback[k];
        } else {
          fallback = undefined;
          break;
        }
      }
      translation = fallback;
    }

    if (!translation || typeof translation !== 'string') {
      console.warn(`[LMS i18n] Missing translation for key: ${key}`);
      return key;
    }

    // Replace parameters
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{{${param}}}`, String(value));
      });
    }

    return translation;
  }

  /**
   * Check if locale is valid
   */
  private isValidLocale(locale: string): locale is LmsLocale {
    return locale === 'en' || locale === 'ar-JUBA';
  }

  /**
   * Subscribe to locale changes
   */
  subscribe(listener: (locale: LmsLocale) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Check if current locale is RTL
   */
  isRTL(): boolean {
    return this.currentLocale === 'ar-JUBA';
  }
}

/**
 * Export singleton instance
 */
export const lmsI18n = new LmsI18n();

/**
 * React hook for translations (can be used directly)
 */
export const useLmsTranslation = () => {
  const [locale, setLocale] = React.useState(lmsI18n.getLocale());

  React.useEffect(() => {
    return lmsI18n.subscribe(setLocale);
  }, []);

  return {
    t: lmsI18n.t.bind(lmsI18n),
    locale,
    setLocale: lmsI18n.setLocale.bind(lmsI18n),
    isRTL: lmsI18n.isRTL(),
  };
};

// Re-export for convenience
import React from 'react';
export { en, arJuba };

