const NFT = artifacts.require("NFT");

contract("NFT", (accounts) => {
  let nft;

  beforeEach(async () => {
    nft = await NFT.new();
  });

  it("should mint an NFT", async () => {
    const receiptHash = web3.utils.sha3("test-receipt");
    const name = "Test NFT";
    const description = "This is a test NFT";
    const image = "https://www.example.com/nft.jpg";

    await nft.mintNFT(receiptHash, name, description, image, { from: accounts[0] });

    const tokenId = await nft.tokenOfOwnerByIndex(accounts[0], 0);
    const metadata = await nft.metadata(tokenId);

    assert.equal(metadata.name, name);
    assert.equal(metadata.description, description);
    assert.equal(metadata.image, image);
  });

  it("should not allow minting an NFT with the same receipt hash twice", async () => {
    const receiptHash = web3.utils.sha3("test-receipt");
    const name = "Test NFT";
    const description = "This is a test NFT";
    const image = "https://www.example.com/nft.jpg";

    await nft.mintNFT(receiptHash, name, description, image, { from: accounts[0] });

    try {
      await nft.mintNFT(receiptHash, name, description, image, { from: accounts[0] });
      assert.fail("Expected an error but did not receive one");
    } catch (err) {
      assert.equal(err.reason, "NFT has already been minted");
    }
  });

  it("should not allow minting more than the minting limit", async () => {
    const receiptHash = web3.utils.sha3("test-receipt");
    const name = "Test NFT";
    const description = "This is a test NFT";
    const image = "https://www.example.com/nft.jpg";

    for (let i = 0; i < 5; i++) {
      await nft.mintNFT(receiptHash, name, description, image, { from: accounts[0] });
    }

    try {
      await nft.mintNFT(receiptHash, name, description, image, { from: accounts[0] });
      assert.fail("Expected an error but did not receive one");
    } catch (err) {
      assert.equal(err.reason, "Minting limit reached");
    }
  });
});
