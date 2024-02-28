import { AssetId, BaseAssetId, BigNumberish } from "fuels";
import type { AuctionContractAbi } from "../sway-api";
import BN from "../utils/BN";
import { AuctionOutput, AuctionInput, IdentityInput } from "../sway-api/contracts/AuctionContractAbi";

const setBid = async (multisigContract: AuctionContractAbi,
  auction_id: BigNumberish,
) => {
  try {
    const txResponse = await multisigContract.functions
    .bid(auction_id)
    .txParams({
      gasPrice: 1,
      gasLimit: 100_000,
    })
    .call();
    console.log('Set Bid successfully', txResponse);
  } catch (error) {
  console.error('Failed to set bid:', error);
  }
};

const cancelAuction = async (
  multisigContract: AuctionContractAbi,
  auction_id: BigNumberish,
) => {
  try {
    const txResponse = await multisigContract.functions
    .cancel(auction_id)
    .txParams({
      gasPrice: 1,
      gasLimit: 100_000,
    })
    .call();
    console.log('Auction canceled successfully', txResponse);
  } catch (error) {
  console.error('Failed to cancel auction:', error);
  }
}

type Option<T> = T | undefined;


const createAuction = async (
  multisigContract: AuctionContractAbi,
  bid_asset: AssetId,
  duration: BigNumberish,
  initial_price: BigNumberish,
  reserve_price: Option<BigNumberish>,
  seller: IdentityInput,
) => {
  try {
    const txResponse = await multisigContract.functions
    .create(
      bid_asset,
      10,
      1,
      0,
      seller
    )
    .txParams({
      gasPrice: 1,
      gasLimit: 100_000,
    })
    .call();
    console.log('Auction created successfully', txResponse);
  } catch (error) {
  console.error('Failed to create auction:', error);
  }
}

const widthdraw = async (
  multisigContract: AuctionContractAbi,
  auction_id: BigNumberish,
) => {
  try {
    const txResponse = await multisigContract.functions
    .withdraw(auction_id)
    .txParams({
      gasPrice: 1,
      gasLimit: 100_000,
    })
    .call();
    console.log('Withdraw successfully', txResponse);
  } catch (error) {
  console.error('Failed to withdraw:', error);
  }
}

const fetchAuctionInfo = async (
  multisigContract: AuctionContractAbi,
  auction_id: BigNumberish,
  setAuctionInfo: Function
) => {
  try {
    const { value } = await multisigContract.functions
    .auction_info(auction_id)
    .txParams({
      gasPrice: 1,
      gasLimit: 100_000,
    })
    .simulate();
    setAuctionInfo(value);
    
    console.log('Auction info:', value);
  } catch (error) {
    console.error('Failed to fetch auction info:', error);
  }
}

const fetchDepositBalance = async (
  multisigContract: AuctionContractAbi,
  auction_id: BigNumberish,
  identity: IdentityInput,
  setDepositBalance: Function
) => {
  try {
    const { value } = await multisigContract.functions
    .deposit_balance(auction_id, identity)
    .txParams({
      gasPrice: 1,
      gasLimit: 100_000,
    })
    .simulate();
    setDepositBalance(value);
    
    console.log('Deposit balance:', value);
  } catch (error) {
    console.error('Failed to fetch deposit balance:', error);
  }
}

const fetchTotalAuctions = async (
  multisigContract: AuctionContractAbi,
  setTotalAuctions: Function
) => {
  try {
    const { value } = await multisigContract.functions
    .total_auctions()
    .txParams({
      gasPrice: 1,
      gasLimit: 100_000,
    })
    .simulate();
    setTotalAuctions(value);
    
    console.log('Total auctions:', value);
  } catch (error) {
    console.error('Failed to fetch total auctions:', error);
  }
}


// const fetchBalance = async (multisigContract: AuctionContractAbi, setBalance: Function) => {
//     try {
//         const assetId: AssetId = {
//         value: BaseAssetId,
//         };
//         const { value } = await multisigContract.functions
//         .balance(assetId)
//         .txParams({
//             gasPrice: 1,
//             gasLimit: 100_000,
//         })
//         .simulate();
//         setBalance(value.toNumber());
//         console.log(new BN(value.toString()))
//     } catch (error) {
//         console.error(error);
//     }
// };


export {
  fetchAuctionInfo,
  fetchDepositBalance,
  setBid,
  createAuction,
  cancelAuction,
  widthdraw,
  fetchTotalAuctions
}