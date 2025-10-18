<script lang="ts">
  import type { BenchmarkResponse } from '$lib/types';
  import { algorithmInfo } from '$lib/stores/algorithms';
  
  let { data }: { data: BenchmarkResponse | null } = $props();
  
  function formatTime(ns: number): string {
    if (ns < 1000) return `${ns.toFixed(0)}ns`;
    if (ns < 1000000) return `${(ns / 1000).toFixed(2)}μs`;
    return `${(ns / 1000000).toFixed(2)}ms`;
  }
</script>

{#if data}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each data.results as result}
      {@const info = algorithmInfo[result.algorithm]}
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border-l-4" style="border-color: {info?.color || '#999'}">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-bold">{result.algorithm}</h3>
          <span class="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">{info?.family}</span>
        </div>
        
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Sign:</span>
            <span class="font-mono">{formatTime(result.statistics.sign.mean_ns)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Verify:</span>
            <span class="font-mono">{formatTime(result.statistics.verify.mean_ns)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Token:</span>
            <span class="font-mono">{result.token_size_bytes} bytes</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Ops/sec:</span>
            <span class="font-mono">{result.statistics.sign.ops_per_second.toFixed(0)}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
  
  {#if data.comparison}
    <div class="mt-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-4 rounded-lg">
      <h3 class="text-lg font-bold mb-3">🏆 Winners</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <span class="text-sm text-gray-600 dark:text-gray-400">Fastest Signing:</span>
          <p class="font-bold text-green-600 dark:text-green-400">{data.comparison.fastest_sign}</p>
        </div>
        <div>
          <span class="text-sm text-gray-600 dark:text-gray-400">Fastest Verification:</span>
          <p class="font-bold text-blue-600 dark:text-blue-400">{data.comparison.fastest_verify}</p>
        </div>
        <div>
          <span class="text-sm text-gray-600 dark:text-gray-400">Smallest Token:</span>
          <p class="font-bold text-purple-600 dark:text-purple-400">{data.comparison.smallest_token}</p>
        </div>
      </div>
    </div>
  {/if}
{/if}
