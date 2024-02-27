import { useEffect, useState } from "react";
import {
  useConnectUI,
  useIsConnected,
  useWallet,
} from '@fuel-wallet/react';
// Import the contract factory -- you can find the name in src/contracts/contracts/index.ts.
// You can also do command + space and the compiler will suggest the correct name.
import { MultisigContractAbi__factory  } from "../sway-api"
import type { MultisigContractAbi } from "../sway-api";
import { AssetId, BaseAssetId, BigNumberish } from "fuels";
import BN from "../utils/BN";
import { fetchInitialState, executeTransaction, setNewThreshold, setWeight, fetchThreshold } from '../helper';
import { SignatureInfoInput } from "../sway-api/contracts/MultisigContractAbi";

const CONTRACT_ID = '0xa20c00c07549c3e316a8ae20dd611dbc9f465d5978c88b2ca6ee720e64d8de5d';

export default function Home() {
  const [contract, setContract] = useState<MultisigContractAbi>();
  const [balance, setBalance] = useState<number>();
  const [threshold, setThreshold] = useState(0);
  const [nonce, setNonce] = useState(0);
  const [walletBalance, setWalletBalance] = useState<string>();
  const { connect, setTheme, isConnecting } = useConnectUI();
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();
  const [newThreshold, setNewThresholdValue] = useState('');

 
  setTheme("dark");
 
  useEffect(() => {
    async function setupContract() {
      if(isConnected && wallet){
        const multisigContract = MultisigContractAbi__factory.connect(CONTRACT_ID, wallet);
        setContract(multisigContract);
        await fetchInitialState(multisigContract, setBalance, setThreshold, setNonce);
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

  const handleSetNewThreshold = async () => {
    if (!contract || !newThreshold) {
      alert("Contract not loaded or new threshold is empty");
      return;
    }
  
    const signatures: SignatureInfoInput[] = [

    ];
  
    const newThresholdValue = parseInt(newThreshold, 10); // Convert input to a number
  
    try {
      await setNewThreshold(contract, signatures, newThresholdValue);
      alert("Threshold updated successfully");
      // Optionally, refresh the displayed threshold
      fetchThreshold(contract, setThreshold);
    } catch (error) {
      console.error("Error setting new threshold:", error);
      alert("Failed to update threshold");
    }
  };
  

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        {isConnected ? (
          <>
            <h3 style={styles.label}>Multisig Wallet Balance</h3>
            <div style={styles.counter}>
              {balance ?? 0} ETH
            </div>
            <h3 style={styles.label}>Wallet Balance</h3>
            <div style={styles.counter}>
              {walletBalance ?? 0} ETH
            </div>
            <div>
              <h3 style={styles.label}>Current Threshold: {threshold}</h3>
              <h3 style={styles.label}>Current Nonce: {nonce}</h3>
            </div>
            <div>
            <h3 style={styles.label}>Set New Threshold</h3>
            <input
              type="number"
              value={newThreshold}
              onChange={(e) => setNewThresholdValue(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleSetNewThreshold} style={styles.button}>Set Threshold</button>
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