import { AssetId, BaseAssetId, BigNumberish } from "fuels";
import type { MultisigContractAbi } from "../sway-api";
import BN from "../utils/BN";

const fetchInitialState = async (multisigContract: MultisigContractAbi, setBalance: Function, setThreshold: Function, setNonce: Function) => {
    await fetchBalance(multisigContract, setBalance);
    await fetchThreshold(multisigContract, setThreshold);
    await fetchNonce(multisigContract, setNonce);
  };

  const fetchBalance = async (multisigContract: MultisigContractAbi, setBalance: Function) => {
    try {
      const assetId: AssetId = {
        value: BaseAssetId,
      };
      const { value } = await multisigContract.functions
        .balance(assetId)
        .txParams({
          gasPrice: 1,
          gasLimit: 100_000,
        })
        .simulate();
      setBalance(value.toNumber());
      console.log(new BN(value.toString()))
    } catch (error) {
      console.error(error);
    }
  };

  const fetchThreshold = async (multisigContract: MultisigContractAbi, setThreshold: Function) => {
    try {
      const result = await multisigContract.functions
      .threshold()
      .txParams({
        gasPrice: 1,
        gasLimit: 100_000,
      })
      .simulate();
      setThreshold(new BN(result.value.toString()).toNumber());
    } catch (error) {
      console.error("Error fetching threshold:", error);
    }
  };

  const fetchNonce = async (multisigContract: MultisigContractAbi, setNonce: Function) => {
    try {
      const result = await multisigContract.functions
      .nonce()
      .txParams({
        gasPrice: 1,
        gasLimit: 100_000,
      })
      .simulate();
      setNonce(new BN(result.value.toString()).toNumber());
    } catch (error) {
      console.error("Error fetching nonce:", error);
    }
  };

  // Placeholder for execute_transaction function
  const executeTransaction = async (multisigContract: MultisigContractAbi, transactionDetails: any) => {
    if (!multisigContract) {
      return alert("Contract not loaded");
    }
    // Implement transaction execution logic here
    // This will involve constructing the transaction parameters
    // and calling `execute_transaction` method on the contract instance
  };

  // Placeholder for set_threshold function
  const setNewThreshold = async  (multisigContract: MultisigContractAbi, transactionDetails: any, newThreshold: number) => {
    if (!multisigContract) {
      return alert("Contract not loaded");
    }
    // Implement threshold setting logic here
  };

  // Placeholder for set_weight function
  const setWeight = async (multisigContract: MultisigContractAbi, transactionDetails: any, userId: string, weight: number) => {
    if (!multisigContract) {
      return alert("Contract not loaded");
    }
    // Implement weight setting logic here
  };


export {
    fetchInitialState,
    executeTransaction,
    setNewThreshold,
    setWeight,
    fetchBalance,
    fetchThreshold,
    fetchNonce,
}