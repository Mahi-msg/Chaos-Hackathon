import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useI18n } from '../../i18n/i18nContext';
import { loadStoredData, saveStoredData } from '../../services/storage';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { t } = useI18n();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return loadStoredData().theme || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveStoredData({ theme });
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('theme_toggle_light') : t('theme_toggle_dark')}
      title={isDark ? t('theme_toggle_light') : t('theme_toggle_dark')}
      className={`min-h-touch min-w-touch p-2 rounded-xl transition flex items-center justify-center ${
        isDark
          ? 'bg-stone-800 text-amber-400 hover:bg-stone-700 border border-stone-700'
          : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 stroke-[2.2]" />
      ) : (
        <Moon className="w-5 h-5 stroke-[2.2]" />
      )}
    </button>
  );
};
