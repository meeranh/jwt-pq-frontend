import { writable } from 'svelte/store';
import type { Algorithm } from '$lib/types';

export const algorithms: Algorithm[] = [
  'RS256',
  'RS512',
  'ML-DSA-44',
  'ML-DSA-65',
  'ML-DSA-87',
  'Falcon-512',
  'Falcon-1024'
];

export const algorithmInfo = {
  'RS256': { family: 'Classical', color: '#3b82f6', security: 'Standard' },
  'RS512': { family: 'Classical', color: '#2563eb', security: 'Standard' },
  'ML-DSA-44': { family: 'Post-Quantum', color: '#10b981', security: 'Level 2' },
  'ML-DSA-65': { family: 'Post-Quantum', color: '#059669', security: 'Level 3' },
  'ML-DSA-87': { family: 'Post-Quantum', color: '#047857', security: 'Level 5' },
  'Falcon-512': { family: 'Post-Quantum', color: '#f59e0b', security: 'Level 1' },
  'Falcon-1024': { family: 'Post-Quantum', color: '#d97706', security: 'Level 5' }
};

export const selectedAlgorithms = writable<Algorithm[]>(['RS256', 'ML-DSA-44', 'Falcon-512']);
