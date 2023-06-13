pragma solidity ^0.8.0;

contract NFTMetadata {
  struct Metadata {
    string name;
    string description;
    string image;
  }

  mapping(uint256 => Metadata) public metadata;

  function setMetadata(uint256 nftId, string memory name, string memory description, string memory image) public {
    metadata[nftId] = Metadata(name, description, image);
  }
}
