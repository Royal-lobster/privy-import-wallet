import { useImportWallet } from "@privy-io/react-auth";
import { useState } from "react";
import { generateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import { ethers } from "ethers";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WalletGeneratorProps {
  onWalletGenerated: (mnemonic: string) => void;
}

export function WalletGenerator({ onWalletGenerated }: WalletGeneratorProps) {
  const { importWallet } = useImportWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleGenerateAndConnect = async () => {
    setIsConnecting(true);
    try {
      const mnemonic = generateMnemonic(wordlist, 128);

      const wallet = ethers.Wallet.fromPhrase(mnemonic);
      await importWallet({ privateKey: wallet.privateKey });

      onWalletGenerated(mnemonic);
      toast.success("Wallet generated and connected successfully!");
    } catch (error) {
      console.error("Wallet generation/import failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast.error("Failed to generate or connect wallet", {
        description: errorMessage
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Wallet Generator</CardTitle>
        <CardDescription className="text-lg">
          Generate a new crypto wallet with BIP39 seed phrase
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleGenerateAndConnect}
          disabled={isConnecting}
          className="w-full h-12 text-lg"
          size="lg"
        >
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Wallet...
            </>
          ) : (
            "Generate New Wallet"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}