import { useEffect, useState } from "react";
import {
  useConnectUI,
  useIsConnected,
  useWallet,
} from '@fuel-wallet/react';
// Import the contract factory -- you can find the name in src/contracts/contracts/index.ts.
// You can also do command + space and the compiler will suggest the correct name.
import { MultisigContractAbi__factory  } from "./sway-api"
import type { MultisigContractAbi } from "./sway-api";
import { AssetId } from "fuels";
 
const CONTRACT_ID = '0xa20c00c07549c3e316a8ae20dd611dbc9f465d5978c88b2ca6ee720e64d8de5d';

export default function Home() {
  const [contract, setContract] = useState<MultisigContractAbi>();
  const [balance, setBalance] = useState<number>();
  const { connect, setTheme, isConnecting } = useConnectUI();
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();
 
  setTheme("dark");
 
  useEffect(() => {
    async function setupContract() {
      if(isConnected && wallet){
        const multisigContract = MultisigContractAbi__factory.connect(CONTRACT_ID, wallet);
        setContract(multisigContract);
        await fetchBalance(multisigContract);
      }
    }
    
    setupContract();
  }, [isConnected, wallet]);
 


  const fetchBalance = async (multisigContract: MultisigContractAbi) => {
    try {
      const assetId: AssetId = {
        value: '0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c',
      };
      const { value } = await multisigContract.functions
        .balance(assetId)
        .txParams({
          gasPrice: 1,
          gasLimit: 100_000,
        })
        .simulate();
      setBalance(value.toNumber());
      console.log(value);
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <div style={styles.root}>
      <div style={styles.container}>
        {isConnected ? (
          <>
            <h3 style={styles.label}>Multisig Wallet Balance</h3>
            <div style={styles.counter}>
              {balance ?? 0} Asset Units
            </div>
            {/* Implement additional functionality like executing transactions, setting thresholds, etc., as needed. */}
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
};