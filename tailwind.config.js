/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Catppuccin colors that work with CSS variables
        'cat-base': 'var(--color-base)',
        'cat-mantle': 'var(--color-mantle)',
        'cat-crust': 'var(--color-crust)',
        'cat-surface0': 'var(--color-surface0)',
        'cat-surface1': 'var(--color-surface1)',
        'cat-surface2': 'var(--color-surface2)',
        'cat-text': 'var(--color-text)',
        'cat-subtext0': 'var(--color-subtext0)',
        'cat-subtext1': 'var(--color-subtext1)',
        'cat-overlay0': 'var(--color-overlay0)',
        'cat-overlay1': 'var(--color-overlay1)',
        'cat-overlay2': 'var(--color-overlay2)',
        'cat-blue': 'var(--color-blue)',
        'cat-green': 'var(--color-green)',
        'cat-red': 'var(--color-red)',
        'cat-yellow': 'var(--color-yellow)',
        'cat-mauve': 'var(--color-mauve)',
        'cat-teal': 'var(--color-teal)',
        'cat-sky': 'var(--color-sky)',
        'cat-sapphire': 'var(--color-sapphire)',
        'cat-lavender': 'var(--color-lavender)',
        'cat-peach': 'var(--color-peach)',
        'cat-maroon': 'var(--color-maroon)',
        'cat-pink': 'var(--color-pink)',
        'cat-flamingo': 'var(--color-flamingo)',
        'cat-rosewater': 'var(--color-rosewater)',
      }
    }
  },
  plugins: []
};
