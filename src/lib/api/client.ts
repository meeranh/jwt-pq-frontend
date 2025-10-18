import type { BenchmarkRequest, BenchmarkResponse, GenerateRequest, GenerateResponse } from '$lib/types';
import { PUBLIC_API_URL } from '$env/static/public';

const API_BASE = PUBLIC_API_URL || 'http://localhost:3000';

export async function runBenchmark(request: BenchmarkRequest): Promise<BenchmarkResponse> {
  const response = await fetch(`${API_BASE}/benchmark`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
  });
  
  if (!response.ok) {
    throw new Error(`Benchmark failed: ${response.statusText}`);
  }
  
  return response.json();
}

export async function generateToken(request: GenerateRequest): Promise<GenerateResponse> {
  const response = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
  });
  
  if (!response.ok) {
    throw new Error(`Token generation failed: ${response.statusText}`);
  }
  
  return response.json();
}

export async function decodeToken(token: string): Promise<any> {
  const response = await fetch(`${API_BASE}/decode`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  });
  
  if (!response.ok) {
    throw new Error(`Token decode failed: ${response.statusText}`);
  }
  
  return response.json();
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/health`);
    return response.ok;
  } catch {
    return false;
  }
}
