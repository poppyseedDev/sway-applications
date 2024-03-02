import {
  useConnectUI,
  useIsConnected,
  useWallet,
} from '@fuel-wallet/react';

import { useEffect, useState } from "react";

export const CreateAuction = () => {
  const { isConnected } = useIsConnected();
  const [status, setStatus] = useState("");

  const [nftAddress, setNftAddress] = useState("");
  const [nftId, setNftId] = useState(0);
  const [startingPrice, setStartingPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [reservePrice, setReservePrice] = useState(0);


  return (
    <div className="text-md justify-center flex items-center">
      {isConnected ? (
        <>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
              <input
                className="bg-white text-black text-lg font-semibold rounded-lg text-center"
                type="text"
                placeholder="Contract Address"
                value={nftAddress}
                onChange={(e) => {
                  setNftAddress(e.target.value);
                }}
              />
              <input
                className="bg-white text-black text-lg font-bold rounded-lg text-center"
                type="string"
                placeholder="NFT ID"
                value={nftId}
                onChange={(e) => {
                  setNftId(Number(e.target.value));
                }}
              />
              <input
                className="bg-white text-black text-lg font-bold rounded-lg text-center"
                type="number"
                placeholder="Starting Price in ETH"
                value={startingPrice}
                onChange={(e) => {
                  setStartingPrice(Number(e.target.value));
                }}
              />
              <input
                className="bg-white text-black text-lg font-bold rounded-lg text-center"
                type="number"
                value={duration}
                placeholder="Duration (in Blocks)"
                onChange={(e) => {
                  setDuration(Number(e.target.value));
                }}
              />
              <input
                className="bg-white text-black text-lg font-bold rounded-lg text-center"
                type="number"
                value={reservePrice}
                placeholder="Reserve Price"
                onChange={(e) => {
                  setReservePrice(Number(e.target.value));
                }}
              />
            </div>
            <button
              className="ml-[35px] w-[150px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"

            >
              Create Auction
            </button>
            <p>{status}</p>
          </div>
        </>
      ) : (
        <p>Please connect your wallet.</p>
      )}
    </div>
  );
};
