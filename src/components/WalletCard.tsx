import { usePrivy, useWallets } from "@privy-io/react-auth";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface WalletCardProps {
  generatedMnemonic: string;
  onDisconnect: () => void;
}

export function WalletCard({ generatedMnemonic, onDisconnect }: WalletCardProps) {
  const { logout, user } = usePrivy();
  const { wallets } = useWallets();

  // Find imported wallet as shown in documentation
  const importedWallet = wallets.find((wallet) => wallet.imported);

  const handleDisconnect = async () => {
    try {
      await logout();
      onDisconnect();
      toast.success("Wallet disconnected successfully.");
    } catch (error) {
      console.error("Disconnect failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast.error("Failed to disconnect wallet", {
        description: errorMessage
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <CardTitle className="text-green-800">Wallet Connected</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground space-y-2">
          {user?.wallet?.address && (
            <div>
              <span className="font-medium">Address:</span>{" "}
              <code className="text-xs break-all bg-muted px-2 py-1 rounded">
                {user.wallet.address}
              </code>
            </div>
          )}
          {user?.wallet?.walletClientType && (
            <div>
              <span className="font-medium">Type:</span>{" "}
              {user.wallet.walletClientType}
            </div>
          )}
        </div>

        {/* Add imported wallet verification as per documentation */}
        <div className="text-sm space-y-2">
          <div>
            <span className="font-medium">Total Wallets:</span> {wallets.length}
          </div>
          <div>
            <span className="font-medium">Imported Wallet Found:</span>{" "}
            {importedWallet ? "✅ Yes" : "❌ No"}
          </div>
          {importedWallet && (
            <div>
              <span className="font-medium">Imported Address:</span>{" "}
              <code className="text-xs break-all bg-muted px-2 py-1 rounded">
                {importedWallet.address}
              </code>
            </div>
          )}
        </div>

        {generatedMnemonic && (
          <Alert>
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium text-yellow-800">🔐 Your Seed Phrase:</p>
                <code className="block text-xs text-yellow-700 break-all bg-yellow-50 p-2 rounded">
                  {generatedMnemonic}
                </code>
                <p className="text-xs text-yellow-600">
                  ⚠️ Save this securely! This is your wallet recovery phrase.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Button onClick={handleDisconnect} variant="outline" className="w-full">
          Disconnect
        </Button>
      </CardContent>
    </Card>
  );
}