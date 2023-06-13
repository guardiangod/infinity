pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
  mapping(bytes32 => bool) public minted;
  mapping(bytes32 => string) public receipts;

  uint256 public startTimestamp;
  uint256 public endTimestamp;
  uint256 public mintingLimit;
  uint256 public mintedCount;

  constructor() ERC721("NFT", "NFT") {
    startTimestamp = block.timestamp;
    endTimestamp = block.timestamp + 30 days;
    mintingLimit = 5;
    mintedCount = 0;
  }

  function mintNFT(bytes32 _receiptHash, string memory _name, string memory _description, string memory _image) public {
    require(block.timestamp >= startTimestamp, "Minting not yet started");
    require(block.timestamp <= endTimestamp, "Minting ended");
    require(!minted[_receiptHash], "NFT has already been minted");

    bytes32 hash = keccak256(abi.encodePacked(msg.sender, _receiptHash));
    require(hash == _receiptHash, "Receipt hash invalid");

    minted[_receiptHash] = true;
    receipts[_receiptHash] = _receiptHash;

    uint256 tokenId = totalSupply() + 1;
    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, _image);
    _setTokenName(tokenId, _name);
    _setTokenDescription(tokenId, _description);

    mintedCount++;
    require(mintedCount <= mintingLimit, "Minting limit reached");
  }

  function _setTokenName(uint256 _tokenId, string memory _name) internal {
    bytes32 slot = keccak256(abi.encodePacked("nft.name", _tokenId));
    bytes32 value = keccak256(abi.encodePacked(_name));
    assembly {
      sstore(slot, value)
    }
  }

  function _setTokenDescription(uint256 _tokenId, string memory _description) internal {
    bytes32 slot = keccak256(abi.encodePacked("nft.description", _tokenId));
    bytes32 value = keccak256(abi.encodePacked(_description));
    assembly {
      sstore(slot, value)
    }
  }
}
