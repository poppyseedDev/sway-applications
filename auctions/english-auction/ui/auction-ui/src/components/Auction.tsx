import { ApproveAuction } from "./web3interact/AssignNFTtoContract";
import { CreateAuction } from "./web3interact/CreateAuction";
import {
  useConnectUI,
  useIsConnected,
  useWallet,
} from '@fuel-wallet/react';

function Auctions() {
  const { isConnected } = useIsConnected();

  if (!isConnected)
    return (
      <>
        <p>Please connect your wallet.</p>
      </>
    );

  return (
    <div>
      <h1>Auctions: </h1>
      <ApproveAuction />
      <CreateAuction />
    </div>
  );
}

export default Auctions;
