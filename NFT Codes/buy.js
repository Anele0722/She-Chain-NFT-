import React, { useState } from "react";
import OwlCarousel from "react-owl-carousel";
import Heading from "./Heading";

const TopNfts = [
  //  NFT data here
];

function TopNFT() {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [purchaseMessage, setPurchaseMessage] = useState("");

  const handleSelectNFT = (nft) => {
    setSelectedNFT(nft);
  };

  const handleBuyNFT = () => {
    if (selectedNFT) {
      // Replace this with the actual purchase logic (e.g., sending a transaction to XRPL)
      setPurchaseMessage(`Purchased ${selectedNFT.name}`);
      setSelectedNFT(null);
    }
  };

  return (
    <div className="my-12">
      <Heading title={"TOP NFTs"} />
      <OwlCarousel
        className="owl-theme"
        loop
        autoplay={true}
        // Rest of the code remains the same
        >
        {TopNfts.map((t) => (
          <div
            key={t.id}
            className="top-hover relative border-8 border-subLightMain pb-5 bg-subMain flex-colo" >
            <div className="relative w-full">
              <img src={t.image} alt={t.name} className="w-full h-64 object-cover" />
              <div className="top-hidden absolute transitione top-1 bottom-1 left-1 right-1 bg-overlay flex-colo">
                <h2 className="font-semibold text-whites">{t.name}</h2>
                <div className="mt-2 text-lg font-black tracking-wider text-whites">{t.price}</div>
              </div>
            </div>

            <button className="px-6 text-whites tracking-wide py-3 mt-5 bt-linear font-bold text-sm rounded">
              Read More
            </button>

            <button onClick={() => handleSelectNFT(t)} className="px-6 text-whites tracking-wide py-3 mt-5 bt-linear font-bold text-sm rounded">
              Select NFT
            </button>
          </div>
        ))}
      </OwlCarousel>

      {selectedNFT && (
        <div>
          <h3>Selected NFT:</h3>
          <div>Name: {selectedNFT.name}</div>
          <div>Price: {selectedNFT.price} XRP</div>
          <button onClick={handleBuyNFT} className="px-6 text-whites tracking-wide py-3 mt-5 bt-linear font-bold text-sm rounded">
            Buy NFT
          </button>
        </div>
      )}

      {purchaseMessage && <p>{purchaseMessage}</p>}
    </div>
  );
}

export default TopNFT;
