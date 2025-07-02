import { createConfig, http } from "wagmi";
import { base, mainnet, sepolia } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [mainnet, base, sepolia],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },
});

export const privyConfig = {
  appearance: { theme: "light" as const, accentColor: "#1E90FF" as `#${string}` },
  embeddedWallets: { createOnLogin: "off" as const, showWalletUIs: true },
  loginMethods: ["wallet" as const],
  supportedChains: [mainnet, base, sepolia],
};