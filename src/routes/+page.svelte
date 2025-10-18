<script lang="ts">
  import { onMount } from 'svelte';
  import { currentBenchmark } from '$lib/stores/benchmark';
  import { runBenchmark } from '$lib/api/client';
  import PerformanceDashboard from '$lib/components/results/PerformanceDashboard.svelte';
  import PerformanceRadar from '$lib/components/charts/PerformanceRadar.svelte';
  import TradeoffScatter from '$lib/components/charts/TradeoffScatter.svelte';
  import TokenSizeBar from '$lib/components/charts/TokenSizeBar.svelte';
  import SecurityMatrix from '$lib/components/results/SecurityMatrix.svelte';
  import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
  import type { Algorithm } from '$lib/types';
  
  let loading = $state(false);
  let error = $state('');
  let mounted = $state(false);
  
  onMount(() => {
    mounted = true;
  });
  
  async function regenerateBenchmarks() {
    loading = true;
    error = '';
    
    try {
      const algorithms: Algorithm[] = ['RS256', 'RS512', 'ML-DSA-44', 'ML-DSA-65', 'ML-DSA-87', 'Falcon-512', 'Falcon-1024'];
      
      const result = await runBenchmark({
        algorithms,
        iterations: 100,
        warmup_iterations: 10,
        payload_size: 'medium'
      });
      
      $currentBenchmark = result;
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to regenerate benchmarks';
    } finally {
      loading = false;
    }
  }
</script>

{#if mounted}
  <div class="space-y-6">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-2 text-cat-text">JWT Post-Quantum Benchmark</h1>
      <p class="text-cat-subtext0">Compare classical and post-quantum cryptographic algorithms for JWT signing</p>
    </div>
    
    {#if loading}
      <div class="flex justify-center py-12">
        <LoadingSpinner size="lg" message="Running benchmarks... This may take a moment." />
      </div>
    {:else if $currentBenchmark}
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold text-cat-text">Benchmark Results</h2>
        <button
          onclick={regenerateBenchmarks}
          class="px-4 py-2 bg-cat-blue text-white rounded-lg hover:bg-cat-sapphire transition-colors flex items-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <span>Regenerate Benchmarks</span>
        </button>
      </div>
      
      {#if error}
        <div class="p-4 bg-cat-red/20 border border-cat-red rounded-lg mb-4">
          <p class="text-cat-red">{error}</p>
        </div>
      {/if}
      
      <PerformanceDashboard data={$currentBenchmark} />
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceRadar results={$currentBenchmark.results} />
        <TradeoffScatter results={$currentBenchmark.results} />
      </div>
      
      <TokenSizeBar results={$currentBenchmark.results} />
      <SecurityMatrix results={$currentBenchmark.results} />
    {:else}
      <div class="text-center py-12 bg-cat-mantle rounded-lg">
        <svg class="w-24 h-24 mx-auto text-cat-overlay0 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
        <p class="text-cat-subtext0 mb-4">No benchmark data available</p>
        <button 
          onclick={regenerateBenchmarks}
          class="px-6 py-3 bg-cat-blue text-white rounded-lg hover:bg-cat-sapphire transition-colors"
        >
          Run Initial Benchmark
        </button>
      </div>
    {/if}
  </div>
{/if}
