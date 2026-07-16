import { writable } from 'svelte/store';
import { DARK_THEMES, THEME_OPTIONS } from '$lib/preferences.js';

export const STORAGE_KEY = 'devtools-theme';

const VALID_THEMES = new Set(THEME_OPTIONS.map((o) => o.value));

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && VALID_THEMES.has(stored)) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.toggle('dark', DARK_THEMES.includes(theme));
  localStorage.setItem(STORAGE_KEY, theme);
}

function createThemeStore() {
  const initial = typeof window !== 'undefined' ? getInitialTheme() : 'light';
  const { subscribe, set, update } = writable(initial);

  if (typeof window !== 'undefined') {
    applyTheme(initial);

    subscribe((value) => {
      applyTheme(value);
    });
  }

  return { subscribe, set, update };
}

export const theme = createThemeStore();
