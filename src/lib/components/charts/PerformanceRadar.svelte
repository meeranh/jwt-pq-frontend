<script lang="ts">
  import { Chart, registerables } from 'chart.js';
  import { untrack } from 'svelte';
  import type { BenchmarkResult } from '$lib/types';
  import { algorithmInfo } from '$lib/stores/algorithms';
  import Tooltip from '$lib/components/ui/Tooltip.svelte';
  
  Chart.register(...registerables);
  
  let { results }: { results: BenchmarkResult[] } = $props();
  
  let canvas = $state<HTMLCanvasElement>();
  let chart: Chart | null = null;
  
  function normalize(value: number, min: number, max: number): number {
    return ((value - min) / (max - min)) * 100;
  }
  
  function getChartTextColor() {
    const computedStyle = getComputedStyle(document.documentElement);
    return computedStyle.getPropertyValue('--color-text').trim();
  }
  
  function getGridColor() {
    const computedStyle = getComputedStyle(document.documentElement);
    return computedStyle.getPropertyValue('--color-overlay0').trim();
  }
  
  function updateChart() {
    const datasets = results.map(result => {
      const signSpeed = 100 - normalize(result.statistics.sign.mean_ns, 0, 30000000);
      const verifySpeed = 100 - normalize(result.statistics.verify.mean_ns, 0, 3000000);
      const tokenSize = 100 - normalize(result.token_size_bytes, 0, 7000);
      const keyEfficiency = 100 - normalize(result.signature_size_bytes, 0, 5000);
      const overall = (signSpeed + verifySpeed + tokenSize + keyEfficiency) / 4;
      
      return {
        label: result.algorithm,
        data: [signSpeed, verifySpeed, tokenSize, keyEfficiency, overall],
        backgroundColor: `${algorithmInfo[result.algorithm]?.color || '#999'}33`,
        borderColor: algorithmInfo[result.algorithm]?.color || '#999',
        borderWidth: 2
      };
    });
    
    const chartData = {
      labels: ['Sign Speed', 'Verify Speed', 'Token Size', 'Key Efficiency', 'Overall'],
      datasets
    };
    
    if (chart) {
      chart.data = chartData;
      // Update colors when theme changes
      const textColor = getChartTextColor();
      const gridColor = getGridColor();
      
      chart.options.scales.r.ticks.color = textColor;
      chart.options.scales.r.pointLabels.color = textColor;
      chart.options.scales.r.grid.color = gridColor;
      chart.options.plugins.legend.labels.color = textColor;
      
      chart.update();
    }
  }
  
  // Initialize chart
  $effect(() => {
    if (canvas && !chart) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const textColor = getChartTextColor();
        const gridColor = getGridColor();
        
        chart = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: ['Sign Speed', 'Verify Speed', 'Token Size', 'Key Efficiency', 'Overall'],
            datasets: []
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  color: textColor,
                  backdropColor: 'transparent'
                },
                pointLabels: {
                  color: textColor,
                  font: {
                    size: 12
                  }
                },
                grid: {
                  color: gridColor
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: textColor,
                  font: {
                    size: 12
                  }
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
  
  // Update chart when results change
  $effect(() => {
    if (results && results.length > 0 && chart) {
      updateChart();
    }
  });
  
  const tooltipText = `Key Efficiency: Measures how compact the signature is relative to other algorithms (smaller is better).

Overall Score: The average of all four metrics (Sign Speed, Verify Speed, Token Size, Key Efficiency), each normalized to 0-100 scale.`;
</script>

<div class="bg-cat-mantle p-4 rounded-lg shadow-lg border border-cat-overlay0">
  <div class="flex items-center space-x-2 mb-4">
    <h3 class="text-lg font-semibold text-cat-text">Algorithm Performance Comparison</h3>
    <Tooltip text={tooltipText} />
  </div>
  <div class="h-96">
    <canvas bind:this={canvas}></canvas>
  </div>
</div>
