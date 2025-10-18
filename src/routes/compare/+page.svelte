<script lang="ts">
  import { generateToken } from '$lib/api/client';
  import AlgorithmSelector from '$lib/components/inputs/AlgorithmSelector.svelte';
  import type { Algorithm } from '$lib/types';
  
  let algorithm1 = $state<Algorithm[]>(['RS256']);
  let algorithm2 = $state<Algorithm[]>(['Falcon-512']);
  let loading = $state(false);
  let comparison = $state<any>(null);
  
  async function handleCompare() {
    loading = true;
    
    try {
      const [result1, result2] = await Promise.all([
        generateToken({ algorithm: algorithm1[0] }),
        generateToken({ algorithm: algorithm2[0] })
      ]);
      
      comparison = {
        alg1: { ...result1, algorithm: algorithm1[0] },
        alg2: { ...result2, algorithm: algorithm2[0] }
      };
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  }
  
  function getWinnerClass(metric1: number, metric2: number, lowerIsBetter: boolean = true): string {
    if (lowerIsBetter) {
      if (metric1 < metric2) return 'text-green-500';
      if (metric1 > metric2) return 'text-red-500';
    } else {
      if (metric1 > metric2) return 'text-green-500';
      if (metric1 < metric2) return 'text-red-500';
    }
    return '';
  }
</script>

<div class="space-y-6">
  <h1 class="text-3xl font-bold text-cat-text">Compare Algorithms</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h3 class="font-semibold mb-2 text-cat-text">Algorithm 1</h3>
      <AlgorithmSelector bind:selected={algorithm1} multiple={false} />
    </div>
    <div>
      <h3 class="font-semibold mb-2 text-cat-text">Algorithm 2</h3>
      <AlgorithmSelector bind:selected={algorithm2} multiple={false} />
    </div>
  </div>
  
	<button
		onclick={handleCompare}
		disabled={loading}
		class="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 border
					 {loading 
						 ? 'bg-cat-overlay0 text-cat-subtext0 border-cat-surface2 cursor-not-allowed' 
						 : 'bg-gradient-to-r from-cat-mauve to-cat-pink text-white border-cat-lavender hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'}"
	>
		{loading ? 'Comparing...' : 'Compare Algorithms'}
	</button>
  
  {#if comparison}
    <div class="bg-cat-mantle rounded-lg shadow-lg overflow-hidden">
      <table class="w-full">
        <thead class="bg-cat-surface0">
          <tr>
            <th class="p-4 text-left text-cat-text">Metric</th>
            <th class="p-4 text-center text-cat-text">{comparison.alg1.algorithm}</th>
            <th class="p-4 text-center text-cat-text">{comparison.alg2.algorithm}</th>
            <th class="p-4 text-center text-cat-text">Difference</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-t border-cat-surface0">
            <td class="p-4 text-cat-text">Generation Time</td>
            <td class="p-4 text-center font-mono font-semibold {getWinnerClass(comparison.alg1.metrics.generation_time_ms, comparison.alg2.metrics.generation_time_ms, true)}">
              {comparison.alg1.metrics.generation_time_ms.toFixed(2)}ms
            </td>
            <td class="p-4 text-center font-mono font-semibold {getWinnerClass(comparison.alg2.metrics.generation_time_ms, comparison.alg1.metrics.generation_time_ms, true)}">
              {comparison.alg2.metrics.generation_time_ms.toFixed(2)}ms
            </td>
            <td class="p-4 text-center text-cat-subtext0 font-mono">
              {Math.abs(comparison.alg1.metrics.generation_time_ms - comparison.alg2.metrics.generation_time_ms).toFixed(2)}ms
            </td>
          </tr>
          
          <tr class="border-t border-cat-surface0">
            <td class="p-4 text-cat-text">Token Size</td>
            <td class="p-4 text-center font-mono font-semibold {getWinnerClass(comparison.alg1.metrics.token_size_bytes, comparison.alg2.metrics.token_size_bytes, true)}">
              {comparison.alg1.metrics.token_size_bytes} bytes
            </td>
            <td class="p-4 text-center font-mono font-semibold {getWinnerClass(comparison.alg2.metrics.token_size_bytes, comparison.alg1.metrics.token_size_bytes, true)}">
              {comparison.alg2.metrics.token_size_bytes} bytes
            </td>
            <td class="p-4 text-center text-cat-subtext0 font-mono">
              {Math.abs(comparison.alg1.metrics.token_size_bytes - comparison.alg2.metrics.token_size_bytes)} bytes
            </td>
          </tr>
          
          <tr class="border-t border-cat-surface0">
            <td class="p-4 text-cat-text">Signature Size</td>
            <td class="p-4 text-center font-mono font-semibold {getWinnerClass(comparison.alg1.metrics.signature_size_bytes, comparison.alg2.metrics.signature_size_bytes, true)}">
              {comparison.alg1.metrics.signature_size_bytes} bytes
            </td>
            <td class="p-4 text-center font-mono font-semibold {getWinnerClass(comparison.alg2.metrics.signature_size_bytes, comparison.alg1.metrics.signature_size_bytes, true)}">
              {comparison.alg2.metrics.signature_size_bytes} bytes
            </td>
            <td class="p-4 text-center text-cat-subtext0 font-mono">
              {Math.abs(comparison.alg1.metrics.signature_size_bytes - comparison.alg2.metrics.signature_size_bytes)} bytes
            </td>
          </tr>
          
          <tr class="border-t border-cat-surface0">
            <td class="p-4 text-cat-text">Public Key Size</td>
            <td class="p-4 text-center font-mono font-semibold {getWinnerClass(comparison.alg1.key_info.public_key_size_bytes, comparison.alg2.key_info.public_key_size_bytes, true)}">
              {comparison.alg1.key_info.public_key_size_bytes} bytes
            </td>
            <td class="p-4 text-center font-mono font-semibold {getWinnerClass(comparison.alg2.key_info.public_key_size_bytes, comparison.alg1.key_info.public_key_size_bytes, true)}">
              {comparison.alg2.key_info.public_key_size_bytes} bytes
            </td>
            <td class="p-4 text-center text-cat-subtext0 font-mono">
              {Math.abs(comparison.alg1.key_info.public_key_size_bytes - comparison.alg2.key_info.public_key_size_bytes)} bytes
            </td>
          </tr>
          
          <tr class="border-t border-cat-surface0">
            <td class="p-4 text-cat-text">Private Key Size</td>
            <td class="p-4 text-center font-mono font-semibold {getWinnerClass(comparison.alg1.key_info.private_key_size_bytes, comparison.alg2.key_info.private_key_size_bytes, true)}">
              {comparison.alg1.key_info.private_key_size_bytes} bytes
            </td>
            <td class="p-4 text-center font-mono font-semibold {getWinnerClass(comparison.alg2.key_info.private_key_size_bytes, comparison.alg1.key_info.private_key_size_bytes, true)}">
              {comparison.alg2.key_info.private_key_size_bytes} bytes
            </td>
            <td class="p-4 text-center text-cat-subtext0 font-mono">
              {Math.abs(comparison.alg1.key_info.private_key_size_bytes - comparison.alg2.key_info.private_key_size_bytes)} bytes
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="p-4 bg-cat-surface0 border-t border-cat-surface1">
        <div class="flex items-center space-x-4 text-sm">
          <span class="flex items-center space-x-1">
            <span class="w-2 h-2 rounded-full bg-green-500"></span>
            <span class="text-cat-text">Better</span>
          </span>
          <span class="flex items-center space-x-1">
            <span class="w-2 h-2 rounded-full bg-red-500"></span>
            <span class="text-cat-text">Worse</span>
          </span>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Ensure Tailwind colors work */
  .text-green-500 {
    color: #10b981 !important;
  }
  
  .text-red-500 {
    color: #ef4444 !important;
  }
  
  .bg-green-500 {
    background-color: #10b981 !important;
  }
  
  .bg-red-500 {
    background-color: #ef4444 !important;
  }
</style>
