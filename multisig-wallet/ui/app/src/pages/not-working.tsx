import { useEffect, useState } from "react";
import {
  useConnectUI,
  useIsConnected,
  useWallet,
} from '@fuel-wallet/react';
import { MultisigContractAbi__factory  } from "./sway-api"
import type { MultisigContractAbi } from "./sway-api";
import { AssetId, BaseAssetId, BigNumberish } from "fuels";
import BN from "./utils/BN";
import { initializeWallet, setNewThreshold, fetchThreshold } from './helper';
import { SignatureInfoInput } from "./sway-api/contracts/MultisigContractAbi";

const CONTRACT_ID = '0xa20c00c07549c3e316a8ae20dd611dbc9f465d5978c88b2ca6ee720e64d8de5d';

export default function Home() {
  const [contract, setContract] = useState<MultisigContractAbi>();
  const [threshold, setThreshold] = useState(0);
  const [walletBalance, setWalletBalance] = useState<string>();
  const [newThreshold, setNewThresholdValue] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [newUserAddress, setNewUserAddress] = useState('');
  const [newUserWeight, setNewUserWeight] = useState<number>(0);
  const { connect, setTheme, isConnecting } = useConnectUI();
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();
  
  setTheme("dark");

  useEffect(() => {
    async function setupContract() {
      if(isConnected && wallet && !contract){
        const multisigContract = MultisigContractAbi__factory.connect(CONTRACT_ID, wallet);
        setContract(multisigContract);
        //await fetchInitialState(multisigContract, setBalance, setThreshold, setNonce);
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

  const handleCreateWallet = async () => {
    if (!contract || users.length === 0) {
      alert("Please add users and set a threshold before creating the wallet");
      return;
    }
    await initializeWallet(contract, users);

  };

  const handleAddUser = () => {
    const newUser = { address: newUserAddress, weight: newUserWeight };
    setUsers([...users, newUser]);
    setNewUserAddress('');
    setNewUserWeight(0);
  };

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
            {/* Existing UI components for balance, threshold, etc. */}
            <div>
              <h3 style={styles.label}>Create New Multisig Wallet</h3>
              <div>
                <h4 style={styles.label}>Add User</h4>
                <input
                  type="text"
                  value={newUserAddress}
                  onChange={(e) => setNewUserAddress(e.target.value)}
                  placeholder="User Address"
                  style={styles.input}
                />
                <label>Users weight</label>
                <input
                  type="number"
                  value={newUserWeight}
                  onChange={(e) => setNewUserWeight(parseInt(e.target.value))}
                  placeholder="User Weight"
                  style={styles.input}
                />
                <button onClick={handleAddUser} style={styles.button}>Add User</button>
              </div>
              <div>
                Current users:
                <ul>
                  {users.map((user, index) => (
                    <li key={index}>Address: {user.address} - Weight: {user.weight}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={styles.label}>Set Threshold</h4>
                <input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(parseInt(e.target.value))}
                  style={styles.input}
                />
              </div>
              <button onClick={handleCreateWallet} style={styles.button}>Create Multisig Wallet</button>
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