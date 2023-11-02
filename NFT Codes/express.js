
//example of how one can structure the backend using Express.js (a Node.js web framework):

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Define a data structure to store user accounts, minted NFTs, and available NFTs.
const users = [];
const mintedNFTs = [];
const availableNFTs = [];

// Route to connect a user's XRP wallet.
app.post("/connect-wallet", (req, res) => {
  const { walletAddress } = req.body;

  // Check if the user with this wallet address already exists.
  const existingUser = users.find((user) => user.walletAddress === walletAddress);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  // Create a new user.
  const newUser = { walletAddress, mintedNFTs: [], purchasedNFTs: [] };
  users.push(newUser);

  res.status(200).json({ message: "User connected successfully." });
});

// Route to mint an NFT.
app.post("/mint-nft", (req, res) => {
  const { walletAddress, nftDetails } = req.body;

  // Find the user by their wallet address.
  const user = users.find((user) => user.walletAddress === walletAddress);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Mint the NFT and add it to the user's mintedNFTs array.
  const newNFT = { ...nftDetails, owner: walletAddress };
  mintedNFTs.push(newNFT);
  user.mintedNFTs.push(newNFT);

  res.status(200).json({ message: "NFT minted successfully." });
});

// Route to list available NFTs for purchase.
app.get("/available-nfts", (req, res) => {
  res.status(200).json(availableNFTs);
});

// Route to purchase an NFT using XRP wallet.
app.post("/purchase-nft", (req, res) => {
  const { walletAddress, nftId } = req.body;

  // Find the user and the NFT to purchase.
  const user = users.find((user) => user.walletAddress === walletAddress);
  const nftToPurchase = availableNFTs.find((nft) => nft.id === nftId);

  if (!user || !nftToPurchase) {
    return res.status(404).json({ message: "User or NFT not found." });
  }

  // Purchase the NFT and update ownership.
  nftToPurchase.owner = walletAddress;
  user.purchasedNFTs.push(nftToPurchase);
  availableNFTs = availableNFTs.filter((nft) => nft.id !== nftId);

  res.status(200).json({ message: "NFT purchased successfully." });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
