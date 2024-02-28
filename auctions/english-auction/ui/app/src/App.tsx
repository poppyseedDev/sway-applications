import { useEffect, useState } from "react";
import {
  useConnectUI,
  useIsConnected,
  useWallet,
} from '@fuel-wallet/react';
import { AuctionContractAbi__factory  } from "./sway-api";
import type { AuctionContractAbi } from "./sway-api";
import { AssetId, BaseAssetId, BigNumberish } from "fuels";
import {
  fetchAuctionInfo,
  fetchDepositBalance,
  setBid,
  createAuction,
  cancelAuction,
  widthdraw,
  fetchTotalAuctions
} from './helper';
import { AuctionOutput, AuctionInput, IdentityInput, AssetIdInput } from "./sway-api/contracts/AuctionContractAbi";

const CONTRACT_ID = '0x376184205f798560be5ecb9387c244a46ec416b9f6854efcdacd668481bc5f65';

export default function Home() {
  const [contract, setContract] = useState<AuctionContractAbi>();
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [auctionId, setAuctionId] = useState<number>();
  const [bidAmount, setBidAmount] = useState<string>('');
  const [auctionInfo, setAuctionInfo] = useState<AuctionOutput | null>(null);
  const { connect, setTheme, isConnecting } = useConnectUI();
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();
 
  setTheme("dark");
 
  useEffect(() => {
    async function setupContract() {
      if(isConnected && wallet){
        const auctionContract = AuctionContractAbi__factory.connect(CONTRACT_ID, wallet);
        setContract(auctionContract);
      }
    }
    
    setupContract();
  }, [isConnected, wallet]);

  useEffect(() => {
    async function fetchWalletBalance() {
      if(isConnected && wallet){
        const balance: BigNumberish = await wallet.getBalance(BaseAssetId);
        setWalletBalance(balance.toNumber() / 1e9);
      }
    }
    fetchWalletBalance();
  }, [isConnected, wallet]);

  const handleCreateAuction = async () => {
    if (!contract || !wallet) {
      alert("Contract not loaded or wallet not connected");
      return;
    }

    const bid_asset: AssetIdInput = {
      value: BaseAssetId, // Replace with the actual asset ID
    }; 
    const duration: BigNumberish = 10; 
    const initial_price: BigNumberish = 10; 
    const reserve_price: BigNumberish = 20; 
    const seller: IdentityInput = { 
      Address: {
        value: wallet.address.toString(),
      },
      ContractId: {
        value: CONTRACT_ID,
      },
    };
    if (contract && wallet) {
      await createAuction(contract, bid_asset, duration, initial_price, reserve_price, seller);
    }
  };

  const handleSetBid = async () => {
    if (contract && auctionId) {
      await setBid(contract, auctionId, /* Parameters: bidAmount */);
      // Fetch updated auction info if needed
    }
  };

  const handleCancelAuction = async () => {
    if (contract && auctionId) {
      await cancelAuction(contract, auctionId);
      // Fetch updated auctions info if needed
    }
  };

  const handleWithdraw = async () => {
    const auctionId = 0; // Replace with the actual auction ID
    if (contract) {
      await widthdraw(contract, auctionId);
    }
  }


  return (
    <div style={styles.root}>
      <div >
        {isConnected ? (
          <>
            <div>
              <label style={styles.label}>Wallet Balance</label>
              <div style={styles.counter}>{walletBalance}</div>
            </div>
            <div>
              <input
                type="text"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter your bid"
                style={styles.input}
              />
              <button onClick={handleSetBid} style={styles.button}>
                Place Bid
              </button>
            </div>
            <button onClick={handleCreateAuction} style={styles.button}>
              Create Auction
            </button>
            <button onClick={handleCancelAuction} style={styles.button}>
              Cancel Auction
            </button>
            {/* Add more buttons and inputs as needed for other actions like withdraw */}
          </>
        ) : (
          <button onClick={() => connect()} style={styles.button}>
            {isConnecting ? 'Connecting' : 'Connect Wallet'}
          </button>
        )}
      </div>
    </div>
  );
}
 
const styles = {
  root: {
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: "black",
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  button: {
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: 5,
    border: 'none',
    backgroundColor: '#61dafb',
    color: 'black',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    border: '1px solid #ccc',
  },
  label: {
    color: 'white',
  },
  counter: {
    color: 'white',
    marginBottom: 20,
  },
};
