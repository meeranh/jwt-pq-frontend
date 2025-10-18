<script lang="ts">
  let { claims = $bindable({}) } = $props();
  let jsonString = $state(JSON.stringify(claims, null, 2));
  let error = $state('');
  
  function updateClaims() {
    try {
      claims = JSON.parse(jsonString);
      error = '';
    } catch (e) {
      error = 'Invalid JSON';
    }
  }
  
  const placeholderText = `{
  "sub": "user123",
  "name": "John Doe",
  "role": "admin"
}`;
</script>

<div class="space-y-2">
  <label class="block text-sm font-medium text-cat-text">Custom Claims (JSON)</label>
  <textarea
    bind:value={jsonString}
    oninput={updateClaims}
    class="w-full h-48 p-3 font-mono text-sm border rounded-lg bg-cat-surface0 border-cat-surface1 text-cat-text placeholder-cat-subtext0 {error ? 'border-cat-red' : ''}"
    placeholder={placeholderText}
  ></textarea>
  {#if error}
    <p class="text-cat-red text-sm">{error}</p>
  {/if}
</div>
