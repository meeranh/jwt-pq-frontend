<script lang="ts">
  import { page } from '$app/stores';
  import ThemeToggle from './ThemeToggle.svelte';
</script>

<nav class="sticky top-0 z-50 bg-cat-mantle shadow-lg border-b border-cat-surface0">
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center h-16">
      <div class="flex items-center space-x-8">
        <a href="/" class="text-xl font-bold text-cat-blue">E259604</a>
        <div class="hidden md:flex space-x-4">
          <a 
            href="/" 
            class="px-3 py-2 rounded-md hover:bg-cat-surface0 transition-colors {$page.url.pathname === '/' ? 'bg-cat-surface0' : ''}"
          >
            Dashboard
          </a>
          <a 
            href="/benchmark" 
            class="px-3 py-2 rounded-md hover:bg-cat-surface0 transition-colors {$page.url.pathname === '/benchmark' ? 'bg-cat-surface0' : ''}"
          >
            Benchmark
          </a>
          <a 
            href="/generate" 
            class="px-3 py-2 rounded-md hover:bg-cat-surface0 transition-colors {$page.url.pathname === '/generate' ? 'bg-cat-surface0' : ''}"
          >
            Generate
          </a>
          <a 
            href="/compare" 
            class="px-3 py-2 rounded-md hover:bg-cat-surface0 transition-colors {$page.url.pathname === '/compare' ? 'bg-cat-surface0' : ''}"
          >
            Compare
          </a>
        </div>
      </div>
      <ThemeToggle />
    </div>
  </div>
</nav>

<!-- Spacer div to create space after navigation -->
<div class="h-8"></div>
