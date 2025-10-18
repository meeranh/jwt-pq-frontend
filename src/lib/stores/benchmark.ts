import { persisted } from 'svelte-persisted-store';
import type { BenchmarkResponse } from '$lib/types';

export const benchmarkHistory = persisted<BenchmarkResponse[]>('benchmarkHistory', []);
export const currentBenchmark = persisted<BenchmarkResponse | null>('currentBenchmark', null);
