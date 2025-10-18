export type Algorithm = 
  | 'RS256' 
  | 'RS512' 
  | 'ML-DSA-44' 
  | 'ML-DSA-65' 
  | 'ML-DSA-87' 
  | 'Falcon-512' 
  | 'Falcon-1024';

export type PayloadSize = 'small' | 'medium' | 'large';

export interface BenchmarkRequest {
  iterations: number;
  algorithms: Algorithm[];
  warmup_iterations: number;
  payload_size: PayloadSize;
}

export interface BenchmarkResult {
  algorithm: string;
  sign_times_ns: number[];
  verify_times_ns: number[];
  statistics: Statistics;
  token_size_bytes: number;
  signature_size_bytes: number;
}

export interface Statistics {
  sign: StatDetails;
  verify: StatDetails;
}

export interface StatDetails {
  mean_ns: number;
  median_ns: number;
  min_ns: number;
  max_ns: number;
  std_dev_ns: number;
  ops_per_second: number;
}

export interface BenchmarkResponse {
  metadata: {
    total_iterations: number;
    warmup_iterations: number;
    timestamp: string;
    payload_size: string;
  };
  results: BenchmarkResult[];
  comparison?: {
    fastest_sign: string;
    fastest_verify: string;
    smallest_token: string;
    performance_vs_rs256: ComparisonDetail[];
  };
}

export interface ComparisonDetail {
  algorithm: string;
  sign_speedup: number;
  verify_speedup: number;
  token_size_ratio: number;
}

export interface GenerateRequest {
  algorithm: Algorithm;
  claims?: any;
}

export interface GenerateResponse {
  success: boolean;
  algorithm: string;
  token: string;
  metrics: {
    token_size_bytes: number;
    signature_size_bytes: number;
    generation_time_ns: number;
    generation_time_ms: number;
  };
  key_info: {
    public_key_size_bytes: number;
    private_key_size_bytes: number;
  };
}
