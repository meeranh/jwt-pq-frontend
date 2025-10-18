<script lang="ts">
  import { Chart, registerables } from 'chart.js';
  import type { BenchmarkResult } from '$lib/types';
  import { algorithmInfo } from '$lib/stores/algorithms';
  
  Chart.register(...registerables);
  
  let { results }: { results: BenchmarkResult[] } = $props();
  
  let canvas = $state<HTMLCanvasElement>();
  let chart: Chart | null = null;
  
  function getChartTextColor() {
    const computedStyle = getComputedStyle(document.documentElement);
    return computedStyle.getPropertyValue('--color-text').trim();
  }
  
  function getGridColor() {
    const computedStyle = getComputedStyle(document.documentElement);
    return computedStyle.getPropertyValue('--color-overlay0').trim();
  }
  
  function updateChart() {
    const datasets = results.map(result => ({
      label: result.algorithm,
      data: [{
        x: result.token_size_bytes,
        y: result.statistics.sign.ops_per_second
      }],
      backgroundColor: algorithmInfo[result.algorithm]?.color || '#999',
      pointRadius: 8,
      pointHoverRadius: 10
    }));
    
    if (chart) {
      chart.data.datasets = datasets;
      
      // Update colors
      const textColor = getChartTextColor();
      const gridColor = getGridColor();
      
      chart.options.scales.x.ticks.color = textColor;
      chart.options.scales.x.title.color = textColor;
      chart.options.scales.x.grid.color = gridColor;
      chart.options.scales.y.ticks.color = textColor;
      chart.options.scales.y.title.color = textColor;
      chart.options.scales.y.grid.color = gridColor;
      chart.options.plugins.legend.labels.color = textColor;
      
      chart.update();
    }
  }
  
  $effect(() => {
    if (canvas && !chart) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const textColor = getChartTextColor();
        const gridColor = getGridColor();
        
        chart = new Chart(ctx, {
          type: 'scatter',
          data: {
            datasets: []
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Token Size (bytes)',
                  color: textColor
                },
                ticks: {
                  color: textColor
                },
                grid: {
                  color: gridColor
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Operations per Second',
                  color: textColor
                },
                ticks: {
                  color: textColor
                },
                grid: {
                  color: gridColor
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: textColor
                }
              },
              tooltip: {
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                callbacks: {
                  label: (context: any) => {
                    return `${context.dataset.label}: ${context.parsed.x} bytes, ${context.parsed.y.toFixed(2)} ops/sec`;
                  }
                }
              }
            }
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
    if (results && results.length > 0 && chart) {
      updateChart();
    }
  });
</script>

<div class="bg-cat-mantle p-4 rounded-lg shadow-lg border border-cat-overlay0">
  <h3 class="text-lg font-semibold mb-4 text-cat-text">Performance vs Size Trade-off</h3>
  <div class="h-96">
    <canvas bind:this={canvas}></canvas>
  </div>
</div>
