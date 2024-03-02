import {
  useConnectUI,
  useDisconnect,
  useIsConnected,
  useWallet,
} from '@fuel-wallet/react';


export const WalletBtn = () => {
  const { connect, setTheme, isConnecting } = useConnectUI();
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();
  const {disconnect } = useDisconnect();

  return (
    <div>
      <div >
        {isConnected ? (
          <>
            <button onClick={() => disconnect()} className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded'>
              {isConnecting ? 'Connecting' : 'Disconnect Wallet'}
            </button>

            {/* Add more buttons and inputs as needed for other actions like withdraw */}
          </>
        ) : (
          <button onClick={() => connect()} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded'>
            {isConnecting ? 'Connecting' : 'Connect Wallet'}
          </button>
        )}
      </div>
    </div>
  );
};
