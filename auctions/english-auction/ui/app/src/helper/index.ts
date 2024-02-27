import { AssetId, BaseAssetId, BigNumberish } from "fuels";
import type { AuctionContractAbi } from "../sway-api";
import BN from "../utils/BN";
import { AuctionOutput, AuctionInput } from "../sway-api/contracts/AuctionContractAbi";

const setBid = async (multisigContract: AuctionContractAbi,
  auction_id: BigNumberish,
) => {
try {
 // Assuming set_weight is the method in your contract
 const txResponse = await multisigContract.functions
 .bid(auction_id)
 .call();
 console.log('Weight set successfully', txResponse);
} catch (error) {
 console.error('Failed to set weight:', error);
}
};

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
  setBid,


}