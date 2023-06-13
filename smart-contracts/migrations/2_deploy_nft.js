const NFT = artifacts.require("NFT");
const NFTMetadata = artifacts.require("NFTMetadata");

module.exports = async function (deployer) {
  await deployer.deploy(NFT);
  const nft = await NFT.deployed();

  await deployer.deploy(NFTMetadata);
  const metadata = await NFTMetadata.deployed();

  // set the metadata contract address in the NFT contract
  await nft.setMetadataContract(metadata.address);
};
