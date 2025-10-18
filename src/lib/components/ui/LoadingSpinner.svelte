<script lang="ts">
  let { size = 'md', message = 'Loading...' }: { size?: 'sm' | 'md' | 'lg', message?: string } = $props();
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };
</script>

<div class="flex flex-col items-center justify-center space-y-4">
  <div class="relative {sizeClasses[size]}">
    <div class="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
    <div class="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
  </div>
  {#if message}
    <p class="text-gray-600 dark:text-gray-400">{message}</p>
  {/if}
</div>

<style>
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
</style>
