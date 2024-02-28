import { useEffect, useState } from "react";
import {
  useConnectUI,
  useIsConnected,
  useWallet,
} from '@fuel-wallet/react';
// Import the contract factory -- you can find the name in src/contracts/contracts/index.ts.
// You can also do command + space and the compiler will suggest the correct name.
import { AuctionContractAbi__factory  } from "./sway-api"
import type { AuctionContractAbi } from "./sway-api";
import { AssetId, BaseAssetId, BigNumberish } from "fuels";
import {
  fetchAuctionInfo,
  fetchDepositBalance,
  setBid,
  createAuction,
  cancelAuction,
  widthdraw,
  fetchTotalAuctions
} from './helper';
import { AuctionOutput, AuctionInput, IdentityInput } from "./sway-api/contracts/AuctionContractAbi";

const CONTRACT_ID = '0x376184205f798560be5ecb9387c244a46ec416b9f6854efcdacd668481bc5f65';

export default function Home() {
  const [contract, setContract] = useState<AuctionContractAbi>();
  const [walletBalance, setWalletBalance] = useState<string>();
  const { connect, setTheme, isConnecting } = useConnectUI();
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();
 
  setTheme("dark");
 
  useEffect(() => {
    async function setupContract() {
      if(isConnected && wallet){
        const multisigContract = AuctionContractAbi__factory.connect(CONTRACT_ID, wallet);
        setContract(multisigContract);
      }
    }
    
    setupContract();
  }, [isConnected, wallet]);

  useEffect(() => {
    async function fetchWalletBalance() {
      if(isConnected && wallet){
        const walletBalance: BigNumberish = await wallet.getBalance(BaseAssetId);
        setWalletBalance(walletBalance.toString());
      }
    }
    fetchWalletBalance();
  }, [isConnected, walletBalance]);

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        {isConnected ? (
          <>
            <div>
              <label style={styles.label}>Wallet Balance</label>
              <div style={styles.counter}>{walletBalance}</div>
            </div>

          </>
        ) : (
          <button
            onClick={() => connect()}
            style={styles.button}
          >
            {isConnecting ? 'Connecting' : 'Connect Wallet'}
          </button>
        )}
      </div>
    </div>
  );
}
 
const styles = {
  root: {
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: "black",
  } as React.CSSProperties,
  container: {
    color: "#ffffffec",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as React.CSSProperties,
  label: {
    fontSize: "28px",
  },
  counter: {
    color: "#a0a0a0",
    fontSize: "48px",
  },
  button: {
    borderRadius: "8px",
    marginTop: "24px",
    backgroundColor: "#707070",
    fontSize: "16px",
    color: "#ffffffec",
    border: "none",
    outline: "none",
    height: "60px",
    padding: "0 1rem",
    cursor: "pointer"
  },
  input: {
    margin: "10px",
    padding: "10px",
  },
  
};