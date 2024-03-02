import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import LandingPage from "./LandingPage";

import BidFairValue from "./BidFairValue";
import BidHidden from "./BidHidden";

import "@rainbow-me/rainbowkit/styles.css";
import { FuelProvider } from '@fuel-wallet/react';

import AuctionsPage from "./AuctionsPage";
import CreateAuctionPage from "./CreateAuctionPage";

function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/auction",
      element: <AuctionsPage />,
    },
    {
      path: "/create-auction",
      element: <CreateAuctionPage />,
    },
    {
      path: "/auction/hidden/:auctionId",
      element: <BidHidden />,
    },
    {
      path: "/auction/fair-value/:auctionId",
      element: <BidFairValue />,
    },
  ]);

  return (
    <FuelProvider 
    fuelConfig={{
        devMode: true,
      }}
    >
      <div className="selection:bg-[#527BFF] selection:text-[#0B0C15]">
        <RouterProvider router={router} />
      </div>
    </FuelProvider>
  );
}

export default App;
