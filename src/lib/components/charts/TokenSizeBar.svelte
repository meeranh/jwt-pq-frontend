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
    const chartData = {
      labels: results.map(r => r.algorithm),
      datasets: [
        {
          label: 'Token Size',
          data: results.map(r => r.token_size_bytes),
          backgroundColor: results.map(r => algorithmInfo[r.algorithm]?.color || '#999'),
        },
        {
          label: 'Signature Size',
          data: results.map(r => r.signature_size_bytes),
          backgroundColor: results.map(r => `${algorithmInfo[r.algorithm]?.color || '#999'}66`),
        }
      ]
    };
    
    if (chart) {
      chart.data = chartData;
      
      // Update colors
      const textColor = getChartTextColor();
      const gridColor = getGridColor();
      
      chart.options.scales.x.ticks.color = textColor;
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
          type: 'bar',
          data: {
            labels: [],
            datasets: []
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                ticks: {
                  color: textColor
                },
                grid: {
                  color: gridColor
                }
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Size (bytes)',
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
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
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
  <h3 class="text-lg font-semibold mb-4 text-cat-text">Token & Signature Sizes</h3>
  <div class="h-64">
    <canvas bind:this={canvas}></canvas>
  </div>
</div>
