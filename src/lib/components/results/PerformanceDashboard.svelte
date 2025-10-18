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
      <div class="bg-cat-mantle p-4 rounded-lg shadow-lg border border-cat-overlay0 border-l-4" style="border-left-color: {info?.color || '#999'}">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-bold text-cat-text">{result.algorithm}</h3>
          <span class="text-xs px-2 py-1 rounded bg-cat-surface0 border border-cat-overlay0 text-cat-subtext0">{info?.family}</span>
        </div>
        
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-cat-subtext0">Sign:</span>
            <span class="font-mono text-cat-text">{formatTime(result.statistics.sign.mean_ns)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-cat-subtext0">Verify:</span>
            <span class="font-mono text-cat-text">{formatTime(result.statistics.verify.mean_ns)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-cat-subtext0">Token:</span>
            <span class="font-mono text-cat-text">{result.token_size_bytes} bytes</span>
          </div>
          <div class="flex justify-between">
            <span class="text-cat-subtext0">Ops/sec:</span>
            <span class="font-mono text-cat-text">{result.statistics.sign.ops_per_second.toFixed(0)}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
  
  {#if data.comparison}
    <div class="mt-6 bg-gradient-to-r from-cat-blue/20 to-cat-green/20 p-4 rounded-lg border border-cat-overlay0">
      <h3 class="text-lg font-bold mb-3 text-cat-text">🏆 Winners</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <span class="text-sm text-cat-subtext0">Fastest Signing:</span>
          <p class="font-bold text-cat-green">{data.comparison.fastest_sign}</p>
        </div>
        <div>
          <span class="text-sm text-cat-subtext0">Fastest Verification:</span>
          <p class="font-bold text-cat-blue">{data.comparison.fastest_verify}</p>
        </div>
        <div>
          <span class="text-sm text-cat-subtext0">Smallest Token:</span>
          <p class="font-bold text-cat-mauve">{data.comparison.smallest_token}</p>
        </div>
      </div>
    </div>
  {/if}
{/if}
