import { useState, useEffect } from "react";
import {
  ETHEREUM_RPC_URL,
  EXECUTION_TPS_POLL_INTERVAL,
} from "../utils/constants";
import type { DataStatus, EthereumRPCResponse, BlockData } from "../types";

export interface UseExecutionTPSReturn {
  executionTPS: number;
  tpsStatus: DataStatus;
}

/**
 * Custom hook for fetching and managing execution layer TPS data
 * @returns {UseExecutionTPSReturn} { executionTPS, tpsStatus }
 */
export const useExecutionTPS = (): UseExecutionTPSReturn => {
  const [executionTPS, setExecutionTPS] = useState<number>(14);
  const [tpsStatus, setTpsStatus] = useState<DataStatus>("est");

  const fetchExecutionTPS = async (): Promise<void> => {
    try {
      const latestRes = await fetch(ETHEREUM_RPC_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_getBlockByNumber",
          params: ["latest", false],
          id: 1,
        }),
      });
      const latestData: EthereumRPCResponse = await latestRes.json();
      if (!latestData.result) throw new Error("No result");
      const latestBlock: BlockData = latestData.result;
      const latestNumber = parseInt(latestBlock.number, 16);

      const prevBlockReqs = [1, 2].map((i) =>
        fetch(ETHEREUM_RPC_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_getBlockByNumber",
            params: [`0x${(latestNumber - i).toString(16)}`, false],
            id: i + 1,
          }),
        })
      );

      const prevResponses = await Promise.all(prevBlockReqs);
      const prevBlocksData: EthereumRPCResponse[] = await Promise.all(
        prevResponses.map((r) => r.json())
      );

      let totalTx = latestBlock.transactions.length;
      let blockCount = 1;

      prevBlocksData.forEach((d) => {
        if (d.result && d.result.transactions) {
          totalTx += d.result.transactions.length;
          blockCount++;
        }
      });

      setExecutionTPS(totalTx / blockCount / 12);
      setTpsStatus("live");
    } catch (e) {
      setTpsStatus("est");
    }
  };

  useEffect(() => {
    fetchExecutionTPS();
    const tpsInterval = setInterval(
      fetchExecutionTPS,
      EXECUTION_TPS_POLL_INTERVAL
    );
    return () => clearInterval(tpsInterval);
  }, []);

  return { executionTPS, tpsStatus };
};
