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
          ? 'border-cat-blue bg-cat-blue/20' 
          : 'border-cat-overlay0 bg-cat-surface0 hover:border-cat-overlay1 hover:bg-cat-surface1'}"
      >
        <div class="flex items-center justify-between">
          <div class="text-left">
            <div class="font-semibold text-cat-text">{alg}</div>
            <div class="text-xs text-cat-subtext0">{info.family}</div>
          </div>
          <div 
            class="w-3 h-3 rounded-full border border-cat-overlay0" 
            style="background-color: {info.color}"
          ></div>
        </div>
      </button>
    {/each}
  </div>
</div>
