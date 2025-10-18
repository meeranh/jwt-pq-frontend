<script lang="ts">
  import type { BenchmarkResult } from '$lib/types';
  import { algorithmInfo } from '$lib/stores/algorithms';
  import Tooltip from '$lib/components/ui/Tooltip.svelte';
  
  let { results }: { results: BenchmarkResult[] } = $props();
  
  const securityLevels = {
    'RS256': 1,
    'RS512': 1,
    'ML-DSA-44': 2,
    'ML-DSA-65': 3,
    'ML-DSA-87': 5,
    'Falcon-512': 1,
    'Falcon-1024': 5
  };
  
  function getColor(value: number, max: number): string {
    const intensity = value / max;
    const hue = 120 * intensity;
    return `hsl(${hue}, 70%, 50%)`;
  }
  
  const performanceTooltip = "Performance Score is calculated based on operations per second (signing speed) divided by 100. Higher scores indicate better performance.";
</script>

<div class="bg-cat-mantle p-4 rounded-lg shadow-lg border border-cat-overlay0">
  <h3 class="text-lg font-semibold mb-4 text-cat-text">Security vs Performance Matrix</h3>
  
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr>
          <th class="text-left p-2 text-cat-text">Algorithm</th>
          <th class="text-center p-2 text-cat-text">Security Level</th>
          <th class="text-center p-2 text-cat-text">Quantum Safe</th>
          <th class="text-center p-2 text-cat-text">
            <div class="flex items-center justify-center space-x-1">
              <span>Performance Score</span>
              <Tooltip text={performanceTooltip} />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {#each results as result}
          {@const info = algorithmInfo[result.algorithm]}
          {@const perfScore = Math.round(result.statistics.sign.ops_per_second / 100)}
          <tr class="border-t border-cat-surface0">
            <td class="p-2 font-semibold text-cat-text">{result.algorithm}</td>
            <td class="text-center p-2">
              <span class="px-2 py-1 rounded text-white text-sm" 
                style="background-color: {getColor(securityLevels[result.algorithm], 5)}">
                Level {securityLevels[result.algorithm]}
              </span>
            </td>
            <td class="text-center p-2">
              {#if info?.family === 'Post-Quantum'}
                <span class="text-cat-green">✓</span>
              {:else}
                <span class="text-cat-red">✗</span>
              {/if}
            </td>
            <td class="text-center p-2">
              <div class="flex items-center justify-center">
                <div class="w-24 bg-cat-surface1 rounded-full h-2">
                  <div class="h-2 rounded-full" 
                    style="width: {Math.min(perfScore, 100)}%; background-color: {info?.color}">
                  </div>
                </div>
                <span class="ml-2 text-sm text-cat-text">{perfScore}</span>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
