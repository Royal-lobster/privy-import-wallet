import { usePrivy } from "@privy-io/react-auth";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { WalletGenerator } from "./WalletGenerator";
import { WalletCard } from "./WalletCard";

export function WalletApp() {
  const { ready, authenticated } = usePrivy();
  const [generatedMnemonic, setGeneratedMnemonic] = useState<string>("");

  const handleWalletGenerated = (mnemonic: string) => {
    setGeneratedMnemonic(mnemonic);
  };

  const handleDisconnect = () => {
    setGeneratedMnemonic("");
  };

  // Loading state
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {!authenticated ? (
          <WalletGenerator onWalletGenerated={handleWalletGenerated} />
        ) : (
          <WalletCard
            generatedMnemonic={generatedMnemonic}
            onDisconnect={handleDisconnect}
          />
        )}
      </div>
    </div>
  );
}