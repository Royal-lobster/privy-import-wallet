# privy-import-wallet

# Privy useImportWallet Hook Bug Reproduction

This repository demonstrates a bug with the `useImportWallet` hook from `@privy-io/react-auth` that causes an "Invalid hook call" error.

## Bug Description

When using the `useImportWallet` hook as documented in the [Privy documentation](https://docs.privy.io/wallets/wallets/import), the following error occurs:

```
Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.
```

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env` file with your Privy App ID:
   ```
   VITE_PRIVY_APP_ID=your_privy_app_id_here
   ```

## How to Reproduce

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Open the app in your browser (should open automatically at `http://localhost:5173`)

3. Click the "Generate New Wallet" button

4. **Expected behavior**: A new wallet should be generated and imported using the `useImportWallet` hook

5. **Actual behavior**: The app throws an "Invalid hook call" error

## Technical Details

### Environment
- `@privy-io/react-auth`: ^2.17.2
- `@privy-io/wagmi`: ^1.0.5
- `react`: ^19.0.0
- `react-dom`: ^19.0.0

### Code Following Documentation

The implementation follows the [Privy wallet import documentation](https://docs.privy.io/wallets/wallets/import) exactly:

```typescript
import { useImportWallet } from "@privy-io/react-auth";

export function WalletGenerator() {
  const { importWallet } = useImportWallet();
  
  const handleGenerateAndConnect = async () => {
    try {
      const mnemonic = generateMnemonic(wordlist, 128);
      const wallet = ethers.Wallet.fromPhrase(mnemonic);
      await importWallet({ privateKey: wallet.privateKey });
      // Error occurs here ☝️
    } catch (error) {
      console.error("Wallet generation/import failed:", error);
    }
  };
}
```

### Provider Setup

The Privy provider is set up correctly in `src/App.tsx`:

```typescript
<PrivyProvider appId={privyAppId} config={privyConfig}>
  <QueryClientProvider client={queryClient}>
    <WagmiProvider config={wagmiConfig}>
      <WalletApp />
    </WagmiProvider>
  </QueryClientProvider>
</PrivyProvider>
```

## Files to Check

- `src/components/WalletGenerator.tsx` - Contains the `useImportWallet` hook usage
- `src/components/WalletCard.tsx` - Shows expected wallet verification using `useWallets`
- `src/App.tsx` - Privy provider setup
- `src/config/wagmi.ts` - Wagmi and Privy configuration

## Expected Fix

The `useImportWallet` hook should work without throwing React hook call errors when used inside a proper React function component within the Privy provider context.
