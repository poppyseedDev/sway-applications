/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.73.0
  Forc version: 0.49.2
  Fuel-Core version: 0.22.0
*/

import type {
  BigNumberish,
  BN,
  Bytes,
  BytesLike,
  Contract,
  DecodedValue,
  EvmAddress,
  FunctionFragment,
  Interface,
  InvokeFunction,
} from 'fuels';

import type { Option, Enum, Vec } from "./common";

export enum ExecutionErrorInput { CanOnlyCallContracts = 'CanOnlyCallContracts', IncorrectSignerOrdering = 'IncorrectSignerOrdering', InsufficientAssetAmount = 'InsufficientAssetAmount', InsufficientApprovals = 'InsufficientApprovals', TransferRequiresAValue = 'TransferRequiresAValue' };
export enum ExecutionErrorOutput { CanOnlyCallContracts = 'CanOnlyCallContracts', IncorrectSignerOrdering = 'IncorrectSignerOrdering', InsufficientAssetAmount = 'InsufficientAssetAmount', InsufficientApprovals = 'InsufficientApprovals', TransferRequiresAValue = 'TransferRequiresAValue' };
export type IdentityInput = Enum<{ Address: AddressInput, ContractId: ContractIdInput }>;
export type IdentityOutput = Enum<{ Address: AddressOutput, ContractId: ContractIdOutput }>;
export enum InitErrorInput { CannotReinitialize = 'CannotReinitialize', NotInitialized = 'NotInitialized', ThresholdCannotBeZero = 'ThresholdCannotBeZero', TotalWeightCannotBeLessThanThreshold = 'TotalWeightCannotBeLessThanThreshold' };
export enum InitErrorOutput { CannotReinitialize = 'CannotReinitialize', NotInitialized = 'NotInitialized', ThresholdCannotBeZero = 'ThresholdCannotBeZero', TotalWeightCannotBeLessThanThreshold = 'TotalWeightCannotBeLessThanThreshold' };
export enum MessageFormatInput { None = 'None', EIP191PersonalSign = 'EIP191PersonalSign' };
export enum MessageFormatOutput { None = 'None', EIP191PersonalSign = 'EIP191PersonalSign' };
export enum MessagePrefixInput { None = 'None', Ethereum = 'Ethereum' };
export enum MessagePrefixOutput { None = 'None', Ethereum = 'Ethereum' };
export type TransactionParametersInput = Enum<{ Call: ContractCallParamsInput, Transfer: TransferParamsInput }>;
export type TransactionParametersOutput = Enum<{ Call: ContractCallParamsOutput, Transfer: TransferParamsOutput }>;
export type TypeToHashInput = Enum<{ Threshold: ThresholdInput, Transaction: TransactionInput, Weight: WeightInput }>;
export type TypeToHashOutput = Enum<{ Threshold: ThresholdOutput, Transaction: TransactionOutput, Weight: WeightOutput }>;
export enum WalletTypeInput { Fuel = 'Fuel', EVM = 'EVM' };
export enum WalletTypeOutput { Fuel = 'Fuel', EVM = 'EVM' };

export type AddressInput = { value: string };
export type AddressOutput = AddressInput;
export type AssetIdInput = { value: string };
export type AssetIdOutput = AssetIdInput;
export type ContractCallParamsInput = { calldata: Bytes, forwarded_gas: BigNumberish, function_selector: Bytes, single_value_type_arg: boolean, transfer_params: TransferParamsInput };
export type ContractCallParamsOutput = { calldata: Bytes, forwarded_gas: BN, function_selector: Bytes, single_value_type_arg: boolean, transfer_params: TransferParamsOutput };
export type ContractIdInput = { value: string };
export type ContractIdOutput = ContractIdInput;
export type ExecuteTransactionEventInput = { nonce: BigNumberish, target: IdentityInput };
export type ExecuteTransactionEventOutput = { nonce: BN, target: IdentityOutput };
export type RawBytesInput = { ptr: BigNumberish, cap: BigNumberish };
export type RawBytesOutput = { ptr: BN, cap: BN };
export type SetThresholdEventInput = { previous_threshold: BigNumberish, threshold: BigNumberish };
export type SetThresholdEventOutput = { previous_threshold: BN, threshold: BN };
export type SetWeightEventInput = { user: UserInput };
export type SetWeightEventOutput = { user: UserOutput };
export type SignatureInfoInput = { message_format: MessageFormatInput, message_prefix: MessagePrefixInput, signature: string, wallet_type: WalletTypeInput };
export type SignatureInfoOutput = { message_format: MessageFormatOutput, message_prefix: MessagePrefixOutput, signature: string, wallet_type: WalletTypeOutput };
export type ThresholdInput = { contract_identifier: ContractIdInput, nonce: BigNumberish, threshold: BigNumberish };
export type ThresholdOutput = { contract_identifier: ContractIdOutput, nonce: BN, threshold: BN };
export type TransactionInput = { contract_identifier: ContractIdInput, nonce: BigNumberish, target: IdentityInput, transaction_parameters: TransactionParametersInput };
export type TransactionOutput = { contract_identifier: ContractIdOutput, nonce: BN, target: IdentityOutput, transaction_parameters: TransactionParametersOutput };
export type TransferParamsInput = { asset_id: AssetIdInput, value: Option<BigNumberish> };
export type TransferParamsOutput = { asset_id: AssetIdOutput, value: Option<BN> };
export type UserInput = { address: string, weight: BigNumberish };
export type UserOutput = { address: string, weight: BN };
export type WeightInput = { contract_identifier: ContractIdInput, nonce: BigNumberish, user: UserInput };
export type WeightOutput = { contract_identifier: ContractIdOutput, nonce: BN, user: UserOutput };

export type MultisigContractAbiConfigurables = {
  THRESHOLD: BigNumberish;
};

interface MultisigContractAbiInterface extends Interface {
  functions: {
    constructor: FunctionFragment;
    execute_transaction: FunctionFragment;
    set_threshold: FunctionFragment;
    set_weight: FunctionFragment;
    approval_weight: FunctionFragment;
    balance: FunctionFragment;
    compute_hash: FunctionFragment;
    nonce: FunctionFragment;
    threshold: FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'constructor', values: [Vec<UserInput>]): Uint8Array;
  encodeFunctionData(functionFragment: 'execute_transaction', values: [Vec<SignatureInfoInput>, IdentityInput, TransactionParametersInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'set_threshold', values: [Vec<SignatureInfoInput>, BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'set_weight', values: [Vec<SignatureInfoInput>, UserInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'approval_weight', values: [string]): Uint8Array;
  encodeFunctionData(functionFragment: 'balance', values: [AssetIdInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'compute_hash', values: [TypeToHashInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'nonce', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'threshold', values: []): Uint8Array;

  decodeFunctionData(functionFragment: 'constructor', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'execute_transaction', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'set_threshold', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'set_weight', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'approval_weight', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'balance', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'compute_hash', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'nonce', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'threshold', data: BytesLike): DecodedValue;
}

export class MultisigContractAbi extends Contract {
  interface: MultisigContractAbiInterface;
  functions: {
    constructor: InvokeFunction<[users: Vec<UserInput>], void>;
    execute_transaction: InvokeFunction<[signatures: Vec<SignatureInfoInput>, target: IdentityInput, transaction_parameters: TransactionParametersInput], void>;
    set_threshold: InvokeFunction<[signatures: Vec<SignatureInfoInput>, threshold: BigNumberish], void>;
    set_weight: InvokeFunction<[signatures: Vec<SignatureInfoInput>, user: UserInput], void>;
    approval_weight: InvokeFunction<[user: string], BN>;
    balance: InvokeFunction<[asset_id: AssetIdInput], BN>;
    compute_hash: InvokeFunction<[type_to_hash: TypeToHashInput], string>;
    nonce: InvokeFunction<[], BN>;
    threshold: InvokeFunction<[], BN>;
  };
}
