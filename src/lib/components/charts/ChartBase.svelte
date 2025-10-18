<script lang="ts">
  import { Chart, registerables } from 'chart.js';
  import type { ChartType, ChartData, ChartOptions } from 'chart.js';
  
  Chart.register(...registerables);
  
  let { 
    type,
    data = $bindable(),
    options = {},
    class: className = ''
  }: {
    type: ChartType,
    data: ChartData,
    options?: ChartOptions,
    class?: string
  } = $props();
  
  let canvas = $state<HTMLCanvasElement>();
  let chart: Chart | null = null;
  
  $effect(() => {
    if (canvas && !chart) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        chart = new Chart(ctx, {
          type,
          data: data || { labels: [], datasets: [] },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            ...options
          }
        });
      }
    }
    
    return () => {
      if (chart) {
        chart.destroy();
        chart = null;
      }
    };
  });
  
  $effect(() => {
    if (chart && data) {
      chart.data = data;
      chart.update();
    }
  });
  
  $effect(() => {
    if (chart && options) {
      chart.options = {
        responsive: true,
        maintainAspectRatio: false,
        ...options
      };
      chart.update();
    }
  });
</script>

<div class={className}>
  <canvas bind:this={canvas}></canvas>
</div>
