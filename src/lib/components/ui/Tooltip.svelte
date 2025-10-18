
<script lang="ts">
  let { text }: { text: string } = $props();
  let showTooltip = $state(false);
</script>

<div class="relative inline-block">
  <button
    type="button"
    aria-label="More information"
    onmouseenter={() => showTooltip = true}
    onmouseleave={() => showTooltip = false}
    class="inline-flex items-center justify-center w-4 h-4 text-gray-400 hover:text-gray-600"
  >
    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
    </svg>
  </button>
  
  {#if showTooltip}
    <div class="absolute z-10 w-64 p-2 text-sm text-gray-700 bg-white rounded-lg shadow-lg border border-gray-200 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
      <div class="relative">
        {text}
        <div class="absolute w-2 h-2 bg-white border-b border-r border-gray-200 transform rotate-45 -bottom-3 left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  {/if}
</div>

