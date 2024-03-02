
export interface Auction {
  nft: string;
  nftId: string;
  seller: string;
  startingBid: string;
  endAt: string;
  started: boolean;
  ended: boolean;
  highestBidder: string;
  highestBid: string;
  reservePrice: string;
  cancelled: boolean;
}

function AuctionIdInfoEncrypted({ auctionId }: { auctionId: number }) {

  // if (error)
  //   return (
  //     <div className="text-red-500">
  //       Error: {(error as any).message || "Unknown error"}
  //     </div>
  //   );

  return (
    <div className="mt-5 p-6 w-full">
      <h3 className="text-2xl font-semibold mb-4">Auction ID: {auctionId}</h3>
      {true ? (
        <div className="">
          <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
            {/* <h4 className="text-xl font-medium">
              NFT ID: {formattedData.nftId}
            </h4>
            <p className="text-gray-600">
              Starting Bid: {formattedData.startingBid} ETH
            </p>
            <p className="text-gray-600">
              Ends In: {Number(formattedData.endAt) - blockNumber} blocks
            </p>
            <p className="text-gray-600">
              Highest Bid: {formattedData.highestBid} ETH
            </p>
            <p
              className={`text-sm ${formattedData.started ? "text-green-500" : "text-red-500"}`}
            >
              {formattedData.started
                ? "Auction Started"
                : "Auction Not Started"}
            </p>
            <p
              className={`text-sm ${formattedData.ended ? "text-red-500" : "text-green-500"}`}
            >
              {formattedData.ended ? "Auction Ended" : "Auction Active"}
            </p> */}
          </div>
        </div>
      ) : (
        <p>No auction data found for ID: {auctionId}.</p>
      )}
    </div>
  );
}

export default AuctionIdInfoEncrypted;
