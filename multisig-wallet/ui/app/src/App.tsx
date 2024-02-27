import { useEffect, useState } from "react";
import {
  useConnectUI,
  useIsConnected,
  useWallet,
} from '@fuel-wallet/react';
import { ContractFactory } from "fuels"; // Import ContractFactory for deployment
import { MultisigContractAbi__factory } from "./sway-api";
import type { MultisigContractAbi } from "./sway-api";
import { AssetId, BaseAssetId, BigNumberish } from "fuels";
import BN from "./utils/BN";
import { initializeWallet, setNewThreshold, fetchThreshold } from './helper';
import { SignatureInfoInput } from "./sway-api/contracts/MultisigContractAbi";

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
      if (isConnected && wallet && !contract) {
        await deployContract(); // Call deployContract instead of connecting to an existing one
      }
    }

    setupContract();
  }, [isConnected, wallet]);

  // New function to deploy a smart contract
  async function deployContract() {
    if (!wallet) return;
    const factory = new MultisigContractAbi__factory(wallet); // Adjust this for your actual contract factory
    const multisigContract = await factory.deploy(/* Constructor arguments if any */);
    setContract(multisigContract);
  }

  // The rest of your component...
}
