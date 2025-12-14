// Ethereum consensus constants
export const SLOT_TIME = 12; // seconds
export const SLOTS_PER_EPOCH = 32;
export const EPOCH_TIME = SLOT_TIME * SLOTS_PER_EPOCH; // 384 seconds

// Cache configuration
export const CACHE_KEY = "eth_validator_cache" as const;
export const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// API endpoints
export const BEACONCHAIN_API =
  "https://beaconcha.in/api/v1/epoch/latest" as const;
export const ETHEREUM_RPC_URL = "https://ethereum-rpc.publicnode.com" as const;

// Polling intervals
export const EXECUTION_TPS_POLL_INTERVAL = 30000; // 30 seconds
