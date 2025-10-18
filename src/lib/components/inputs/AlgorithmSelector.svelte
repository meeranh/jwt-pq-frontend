<script lang="ts">
  import { algorithms, algorithmInfo } from '$lib/stores/algorithms';
  import type { Algorithm } from '$lib/types';
  
  let { selected = $bindable([]), multiple = true }: { selected: Algorithm[], multiple?: boolean } = $props();
  
  function toggleAlgorithm(alg: Algorithm) {
    if (multiple) {
      if (selected.includes(alg)) {
        selected = selected.filter(a => a !== alg);
      } else {
        selected = [...selected, alg];
      }
    } else {
      selected = [alg];
    }
  }
</script>

<div class="space-y-2">
  <h3 class="text-sm font-semibold text-cat-subtext0">Select Algorithms</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
    {#each algorithms as alg}
      {@const info = algorithmInfo[alg]}
      <button
        onclick={() => toggleAlgorithm(alg)}
        class="p-3 rounded-lg border-2 transition-all {selected.includes(alg) 
          ? 'border-cat-yellow bg-cat-yellow/30 shadow-md shadow-cat-yellow/20' 
          : 'border-cat-overlay0 bg-cat-surface0 hover:border-cat-overlay1 hover:bg-cat-surface1'}"
      >
        <div class="flex items-center justify-between">
          <div class="text-left">
            <div class="font-semibold text-cat-text {selected.includes(alg) ? 'text-cat-text' : ''}">{alg}</div>
            <div class="text-xs {selected.includes(alg) ? 'text-cat-subtext1 font-medium' : 'text-cat-subtext0'}">{info.family}</div>
          </div>
          <div class="flex items-center space-x-1">
            {#if selected.includes(alg)}
              <svg class="w-4 h-4 text-cat-yellow" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            {/if}
            <div 
              class="w-3 h-3 rounded-full border {selected.includes(alg) ? 'border-cat-yellow' : 'border-cat-overlay0'}" 
              style="background-color: {info.color}"
            ></div>
          </div>
        </div>
      </button>
    {/each}
  </div>
  
  {#if multiple && selected.length > 0}
    <div class="mt-2 text-sm text-cat-subtext0">
      Selected: <span class="font-semibold text-cat-yellow">{selected.length} algorithm{selected.length !== 1 ? 's' : ''}</span>
    </div>
  {/if}
</div>
