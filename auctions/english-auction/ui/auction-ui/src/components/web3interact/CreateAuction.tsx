import {
  useIsConnected,

} from '@fuel-wallet/react';

export const CreateAuction = () => {
  const { isConnected } = useIsConnected();

  // const nft_address = addresses[sepolia.id]?.NFT_ADDRESS;
  const nft_id = 3;
  const starting_price = 1;
  const duration = 100;
  const reserve_price = 3;

  // Parameters for creating an auction
  // const params = {
  //   functionName: "createAndStartAuction",
  //   args: [nft_address, nft_id, starting_price, duration, reserve_price],
  // };

  // const { execute, status, isLoading } = useContractFunction(params);

  if (isConnected)
    return (
      <div className="text-md justify-center flex items-center">
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"

          >
            Create Auction
          </button>
          <p>{status}</p>
        </>
      </div>
    );
};
