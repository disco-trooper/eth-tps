import { useState, useEffect } from "react";
import { CACHE_KEY, CACHE_DURATION, BEACONCHAIN_API } from "../utils/constants";
import type {
  DataStatus,
  BeaconchainResponse,
  CachedValidatorData,
} from "../types";

export interface UseValidatorDataReturn {
  validatorCount: number;
  valStatus: DataStatus;
  loadingVal: boolean;
  refreshValidators: (forceRefresh?: boolean) => Promise<void>;
}

/**
 * Custom hook for fetching and managing validator count data
 * @returns {UseValidatorDataReturn} { validatorCount, valStatus, loadingVal, refreshValidators }
 */
export const useValidatorData = (): UseValidatorDataReturn => {
  const [validatorCount, setValidatorCount] = useState<number>(1086000);
  const [valStatus, setValStatus] = useState<DataStatus>("est");
  const [loadingVal, setLoadingVal] = useState<boolean>(false);

  const fetchValidatorCount = async (
    forceRefresh: boolean = false
  ): Promise<void> => {
    setLoadingVal(true);

    try {
      if (!forceRefresh) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed: CachedValidatorData = JSON.parse(cached);
          const age = Date.now() - parsed.timestamp;
          if (age < CACHE_DURATION) {
            setValidatorCount(parsed.count);
            setValStatus("cached");
            setLoadingVal(false);
            return;
          }
        }
      }

      const response = await fetch(BEACONCHAIN_API);
      if (!response.ok) throw new Error("API Error");
      const json: BeaconchainResponse = await response.json();

      if (json.status === "OK" && json.data?.validatorscount) {
        const count = json.data.validatorscount;
        setValidatorCount(count);
        setValStatus("live");
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            count: count,
            timestamp: Date.now(),
          } satisfies CachedValidatorData)
        );
      } else {
        throw new Error("Invalid format");
      }
    } catch (error) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed: CachedValidatorData = JSON.parse(cached);
        setValidatorCount(parsed.count);
        setValStatus("cached");
      } else {
        setValStatus("est");
      }
    } finally {
      setLoadingVal(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchValidatorCount();
  }, []);

  return {
    validatorCount,
    valStatus,
    loadingVal,
    refreshValidators: fetchValidatorCount,
  };
};
