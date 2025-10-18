<script lang="ts">
  import { generateToken, decodeToken } from '$lib/api/client';
  import AlgorithmSelector from '$lib/components/inputs/AlgorithmSelector.svelte';
  import PayloadEditor from '$lib/components/inputs/PayloadEditor.svelte';
  import type { Algorithm } from '$lib/types';
  
  let selectedAlgorithm = $state<Algorithm[]>(['RS256']);
  let claims = $state({
    sub: 'test-user',
    name: 'John Doe',
    role: 'admin'
  });
  let token = $state('');
  let decodedToken = $state<any>(null);
  let metrics = $state<any>(null);
  let loading = $state(false);
  let error = $state('');
  
  async function handleGenerate() {
    loading = true;
    error = '';
    
    try {
      const result = await generateToken({
        algorithm: selectedAlgorithm[0],
        claims
      });
      
      if (result.success) {
        token = result.token;
        metrics = result.metrics;
        
        // Auto-decode
        const decoded = await decodeToken(token);
        decodedToken = decoded;
      } else {
        error = 'Failed to generate token';
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'Generation failed';
    } finally {
      loading = false;
    }
  }
  
  function copyToken() {
    navigator.clipboard.writeText(token);
  }
</script>

<div class="space-y-6">
  <h1 class="text-3xl font-bold">Generate JWT Token</h1>
  
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="space-y-4">
      <AlgorithmSelector bind:selected={selectedAlgorithm} multiple={false} />
      <PayloadEditor bind:claims />
      
			<button
				onclick={handleGenerate}
				disabled={loading || selectedAlgorithm.length === 0}
				class="w-full py-3 px-6 bg-cat-green text-white rounded-lg border border-cat-teal hover:bg-cat-teal disabled:bg-cat-overlay0 disabled:border-cat-surface2 transition-colors"
			>
				{loading ? 'Generating...' : 'Generate Token'}
			</button>
      
      {#if error}
        <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p class="text-red-600 dark:text-red-400">{error}</p>
        </div>
      {/if}
    </div>
    
    <div class="space-y-4">
      {#if metrics}
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 class="font-semibold mb-2">Generation Metrics</h3>
          <ul class="space-y-1 text-sm">
            <li>Time: {metrics.generation_time_ms.toFixed(2)}ms</li>
            <li>Token Size: {metrics.token_size_bytes} bytes</li>
            <li>Signature Size: {metrics.signature_size_bytes} bytes</li>
          </ul>
        </div>
      {/if}
      
      {#if token}
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold">Generated Token</h3>
            <button onclick={copyToken} class="text-sm text-blue-500 hover:text-blue-600">
              Copy
            </button>
          </div>
          <div class="p-2 bg-gray-100 dark:bg-gray-900 rounded break-all font-mono text-xs">
            {token}
          </div>
        </div>
      {/if}
      
      {#if decodedToken}
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 class="font-semibold mb-2">Decoded Token</h3>
          <div class="space-y-2">
            <div>
              <h4 class="text-sm font-medium text-gray-600 dark:text-gray-400">Header</h4>
              <pre class="p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs overflow-x-auto">{JSON.stringify(decodedToken.header, null, 2)}</pre>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-600 dark:text-gray-400">Payload</h4>
              <pre class="p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs overflow-x-auto">{JSON.stringify(decodedToken.payload, null, 2)}</pre>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
