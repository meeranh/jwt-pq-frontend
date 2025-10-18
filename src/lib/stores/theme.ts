import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Default to dark mode
const defaultTheme = 'dark';
const initialTheme = browser ? localStorage.getItem('theme') ?? defaultTheme : defaultTheme;

export const theme = writable<'light' | 'dark'>(initialTheme as 'light' | 'dark');

theme.subscribe((value) => {
  if (browser) {
    localStorage.setItem('theme', value);
    document.documentElement.setAttribute('data-theme', value);
    // Update class for Tailwind
    if (value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
});
