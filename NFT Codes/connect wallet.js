import React, { useState } from "react";
import Wallet from "xrpl-wallet"; // Import the XRPL wallet library

function ConnectWallet({ onConnect }) {
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState(null);

  // Function to connect the XRPL wallet
  const connectXRPWallet = () => {
    try {
      const newWallet = Wallet.generate(); // Generate a new XRPL wallet

      // Simulate connecting to an XRPL wallet (replace with actual XRPL wallet connection)
      // For example, you can use the wallet's address and secret to connect to the XRPL network
      const address = newWallet.address;
      const secret = newWallet.secret;

      // Set the wallet and mark it as connected
      setWallet(newWallet);
      setConnected(true);

      // Invoke the callback with the wallet information
      onConnect({ address, secret });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setConnected(false);
    }
  };

  return (
    <div>
      {!connected ? (
        <button onClick={connectXRPWallet} className="bt-linear font-semibold text-whites text-sm py-3 px-8 rounded">
          CONNECT WALLET
        </button>
      ) : (
        <div>
          <p>Connected Address: {wallet.address}</p>
          <p>Secret: {wallet.secret}</p>
        </div>
      )}
    </div>
  );
}

export default ConnectWallet;
