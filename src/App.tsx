import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "@privy-io/wagmi";
import { Toaster } from "sonner";

import { WalletApp } from "@/components/WalletApp";
import { wagmiConfig, privyConfig } from "@/config/wagmi";

const queryClient = new QueryClient();

export default function App() {
  const privyAppId = (import.meta as any).env.VITE_PRIVY_APP_ID;

  return (
    <PrivyProvider appId={privyAppId} config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <WalletApp />
          <Toaster />
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
