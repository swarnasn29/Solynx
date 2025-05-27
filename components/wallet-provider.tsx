"use client";

import React, { useMemo, createContext, useContext, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
  useWallet as useSolanaWallet,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
// import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

// imports here

// Wallet context types
type WalletState = {
  isConnected: boolean;
  address: string | null;
  connect: () => void;
  disconnect: () => void;
}

// Create context with default values
const WalletContext = createContext<WalletState>({
  isConnected: false,
  address: null,
  connect: () => {},
  disconnect: () => {},
});

// Hook to use the wallet context
export const useWallet = () => useContext(WalletContext);

// Inner provider component that handles the wallet state
function WalletStateProvider({ children }: { children: React.ReactNode }) {
  const solanaWallet = useSolanaWallet();
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connect = async () => {
    try {
      await solanaWallet.connect();
      setIsConnected(true);
      setAddress(solanaWallet.publicKey?.toString() || null);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnect = async () => {
    try {
      await solanaWallet.disconnect();
      setIsConnected(false);
      setAddress(null);
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  const value = {
    isConnected,
    address,
    connect,
    disconnect,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export default function AppWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletStateProvider>{children}</WalletStateProvider>
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}