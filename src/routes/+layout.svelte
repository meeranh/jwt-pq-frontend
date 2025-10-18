<script lang="ts">
  import '../app.css';
  import Navigation from '$lib/components/layout/Navigation.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import { theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';
  
  let { children } = $props();
  
  // Set theme immediately on mount
  onMount(() => {
    // Apply theme immediately
    const currentTheme = $theme || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
  
  // Watch theme changes
  $effect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', $theme);
      if ($theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });
</script>

<svelte:head>
  <script>
    // Prevent flash of wrong theme
    (function() {
      const theme = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    })();
  </script>
</svelte:head>

<div class="min-h-screen flex flex-col bg-cat-base">
  <Navigation />
  <main class="container mx-auto px-4 py-8 flex-1 mt-2">
    {@render children()}
  </main>
  <Footer />
</div>
