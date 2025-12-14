/**
 * Data status types for API responses
 */
export type DataStatus = "live" | "cached" | "est";

/**
 * Visualizer display mode
 */
export type VisualizerMode = "exec" | "vote" | "total";

/**
 * Beaconchain API response structure
 */
export interface BeaconchainResponse {
  status: string;
  data?: {
    validatorscount: number;
  };
}

/**
 * Ethereum RPC response structure
 */
export interface EthereumRPCResponse {
  jsonrpc: string;
  result?: BlockData;
  error?: {
    code: number;
    message: string;
  };
  id: number;
}

/**
 * Ethereum block data structure
 */
export interface BlockData {
  number: string;
  transactions: string[];
}

/**
 * Cached validator data structure
 */
export interface CachedValidatorData {
  count: number;
  timestamp: number;
}
