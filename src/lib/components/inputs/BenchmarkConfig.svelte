<script lang="ts">
  import type { PayloadSize } from '$lib/types';
  
  let { 
    iterations = $bindable(100),
    warmupIterations = $bindable(10),
    payloadSize = $bindable('medium' as PayloadSize)
  } = $props();
</script>

<div class="space-y-4 p-4 bg-cat-surface0 rounded-lg">
  <div>
    <label class="block text-sm font-medium mb-2 text-cat-text">
      Iterations: <span class="font-bold text-cat-blue">{iterations}</span>
    </label>
    <input 
      type="range" 
      bind:value={iterations}
      min="10" 
      max="1000" 
      step="10"
      class="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
      style="background: linear-gradient(to right, var(--color-blue) 0%, var(--color-blue) {(iterations - 10) / 990 * 100}%, var(--color-surface1) {(iterations - 10) / 990 * 100}%, var(--color-surface1) 100%);"
    />
    <div class="flex justify-between text-xs text-cat-subtext0 mt-1">
      <span>10</span>
      <span>500</span>
      <span>1000</span>
    </div>
  </div>
  
  <div>
    <label class="block text-sm font-medium mb-2 text-cat-text">
      Warmup Iterations: <span class="font-bold text-cat-blue">{warmupIterations}</span>
    </label>
    <input 
      type="range" 
      bind:value={warmupIterations}
      min="5" 
      max="50" 
      step="5"
      class="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
      style="background: linear-gradient(to right, var(--color-blue) 0%, var(--color-blue) {(warmupIterations - 5) / 45 * 100}%, var(--color-surface1) {(warmupIterations - 5) / 45 * 100}%, var(--color-surface1) 100%);"
    />
  </div>
  
  <div>
    <label class="block text-sm font-medium mb-2 text-cat-text">Payload Size</label>
    <div class="flex space-x-2">
      {#each ['small', 'medium', 'large'] as size}
        <button
          onclick={() => payloadSize = size as PayloadSize}
          class="px-4 py-2 rounded-lg flex-1 transition-all {payloadSize === size 
            ? 'bg-cat-blue text-white' 
            : 'bg-cat-surface1 text-cat-text hover:bg-cat-surface2'}"
        >
          {size.charAt(0).toUpperCase() + size.slice(1)}
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .slider::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--color-blue);
    cursor: pointer;
    border: 2px solid var(--color-base);
  }
  
  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--color-blue);
    cursor: pointer;
    border: 2px solid var(--color-base);
  }
</style>
