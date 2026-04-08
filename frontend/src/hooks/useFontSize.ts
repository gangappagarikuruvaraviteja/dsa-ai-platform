import { useEffect, useState } from 'react';

export type FontSize = 'normal' | 'medium' | 'large';

const FONT_SIZE_MAP: Record<FontSize, string> = {
  normal: '16px',
  medium: '18px',
  large: '20px',
};

const STORAGE_KEY = 'dsa-easy-font-size';

export function useFontSize() {
  const [fontSize, setFontSize] = useState<FontSize>('normal');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as FontSize | null;
    if (saved && saved in FONT_SIZE_MAP) {
      setFontSize(saved);
      applyFontSize(saved);
    }
  }, []);

  const applyFontSize = (size: FontSize) => {
    document.documentElement.style.fontSize = FONT_SIZE_MAP[size];
  };

  const updateFontSize = (newSize: FontSize) => {
    setFontSize(newSize);
    localStorage.setItem(STORAGE_KEY, newSize);
    applyFontSize(newSize);
  };

  const increaseFontSize = () => {
    const sizes: FontSize[] = ['normal', 'medium', 'large'];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex < sizes.length - 1) {
      const nextSize = sizes[currentIndex + 1];
      updateFontSize(nextSize);
    }
  };

  return { fontSize, updateFontSize, increaseFontSize };
}
