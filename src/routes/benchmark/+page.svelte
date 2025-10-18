<script lang="ts">
  import { runBenchmark } from '$lib/api/client';
  import { currentBenchmark, benchmarkHistory } from '$lib/stores/benchmark';
  import AlgorithmSelector from '$lib/components/inputs/AlgorithmSelector.svelte';
  import BenchmarkConfig from '$lib/components/inputs/BenchmarkConfig.svelte';
  import PerformanceDashboard from '$lib/components/results/PerformanceDashboard.svelte';
  import type { Algorithm, PayloadSize } from '$lib/types';
  
  let selectedAlgorithms = $state<Algorithm[]>(['RS256', 'ML-DSA-44', 'Falcon-512']);
  let iterations = $state(100);
  let warmupIterations = $state(10);
  let payloadSize = $state<PayloadSize>('medium');
  let loading = $state(false);
  let error = $state('');
  
  async function handleBenchmark() {
    loading = true;
    error = '';
    
    try {
      const result = await runBenchmark({
        algorithms: selectedAlgorithms,
        iterations,
        warmup_iterations: warmupIterations,
        payload_size: payloadSize
      });
      
      $currentBenchmark = result;
      $benchmarkHistory = [...$benchmarkHistory, result];
    } catch (e) {
      error = e instanceof Error ? e.message : 'Benchmark failed';
    } finally {
      loading = false;
    }
  }
</script>

<div class="space-y-6">
  <h1 class="text-3xl font-bold">Run Benchmark</h1>
  
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="space-y-4">
      <AlgorithmSelector bind:selected={selectedAlgorithms} />
      <BenchmarkConfig 
        bind:iterations 
        bind:warmupIterations 
        bind:payloadSize 
      />
      
			<button
				onclick={handleBenchmark}
				disabled={loading || selectedAlgorithms.length === 0}
				class="w-full py-3 px-6 bg-cat-blue text-white rounded-lg border border-cat-lavender hover:bg-cat-sapphire disabled:bg-cat-overlay0 disabled:border-cat-surface2 disabled:cursor-not-allowed transition-colors"
			>
				{loading ? 'Running Benchmark...' : 'Run Benchmark'}
			</button>
      
      {#if error}
        <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p class="text-red-600 dark:text-red-400">{error}</p>
        </div>
      {/if}
    </div>
    
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <h3 class="font-semibold mb-2">Selected Configuration</h3>
      <ul class="space-y-1 text-sm">
        <li>Algorithms: {selectedAlgorithms.join(', ') || 'None'}</li>
        <li>Iterations: {iterations}</li>
        <li>Warmup: {warmupIterations}</li>
        <li>Payload: {payloadSize}</li>
      </ul>
    </div>
  </div>
  
  {#if $currentBenchmark && !loading}
    <PerformanceDashboard data={$currentBenchmark} />
  {/if}
</div>
