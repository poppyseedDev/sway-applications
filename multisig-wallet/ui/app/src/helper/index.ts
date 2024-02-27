import { AssetId, BaseAssetId, BigNumberish } from "fuels";
import type { MultisigContractAbi } from "../sway-api";
import BN from "../utils/BN";
import { TransactionParametersInput, SignatureInfoInput, IdentityInput, UserInput } from "../sway-api/contracts/MultisigContractAbi";

const fetchInitialState = async (multisigContract: MultisigContractAbi, setBalance: Function, setThreshold: Function, setNonce: Function) => {
    await fetchBalance(multisigContract, setBalance);
    await fetchThreshold(multisigContract, setThreshold);
    await fetchNonce(multisigContract, setNonce);
  };


const initializeWallet = async (multisigContract: MultisigContractAbi, users: UserInput[]) => {
    if (!multisigContract) {
        return alert("Contract not loaded");
      }
    try {
      const txResponse = await multisigContract.functions
      .constructor(users)
      .txParams({
        gasPrice: 1,
        gasLimit: 100_000,
      })
      .call();
      console.log('Wallet created successfully', txResponse);
      alert("Wallet created successfully");
    } catch (error) {
      console.error('Failed to create wallet:', error);
    }
}


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

/**
 * Sets the weight of a user in the multisig contract.
 * 
 * @param {MultisigContractAbi} multisigContract The contract instance.
 * @param {string} userId The user's identifier.
 * @param {number} weight The weight to be set for the user.
 */
const setWeight = async (multisigContract: MultisigContractAbi,
     signatures: SignatureInfoInput[],
     userInput: UserInput,
  ) => {
  try {
    // Assuming set_weight is the method in your contract
    const txResponse = await multisigContract.functions.set_weight(signatures, userInput).call();
    console.log('Weight set successfully', txResponse);
  } catch (error) {
    console.error('Failed to set weight:', error);
  }
};

/**
 * Sets a new threshold for transaction execution in the multisig contract.
 * 
 * @param {MultisigContractAbi} multisigContract The contract instance.
 * @param {number} newThreshold The new threshold value.
 */
const setNewThreshold = async (
    multisigContract: MultisigContractAbi,
    signatures: SignatureInfoInput[],

    newThreshold: BigNumberish
) => {
  try {
    // Assuming set_threshold is the method in your contract
    const txResponse = await multisigContract.functions.set_threshold(signatures, newThreshold).call();
    console.log('Threshold set successfully', txResponse);
  } catch (error) {
    console.error('Failed to set new threshold:', error);
  }
};

/**
 * Executes a transaction through the multisig contract.
 * 
 * @param {MultisigContractAbi} multisigContract The contract instance.
 * @param {Vec<SignatureInfoInput>} signatures The signatures authorizing the transaction.
 * @param {IdentityInput} target The target of the transaction.
 * @param {TransactionParametersInput} transactionParameters The parameters of the transaction.
 */
const executeTransaction = async (
    multisigContract: MultisigContractAbi,
    signatures: SignatureInfoInput[],
    target: IdentityInput,
    transactionParameters: TransactionParametersInput
  ) => {
    try {
      const txResponse = await multisigContract.functions.execute_transaction(
        signatures,
        target,
        transactionParameters
      ).call();
      console.log('Transaction executed successfully', txResponse);
    } catch (error) {
      console.error('Failed to execute transaction:', error);
    }
  };
  


export {
    initializeWallet,
    fetchInitialState,
    executeTransaction,
    setNewThreshold,
    setWeight,
    fetchBalance,
    fetchThreshold,
    fetchNonce,
}