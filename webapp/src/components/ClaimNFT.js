import React, { useState } from 'react';
import axios from 'axios';
import NFTMetadata from './NFTMetadata';
import NFTImage from './NFTImage';

export default function ClaimNFT() {
  const [nric, setNRIC] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/nft', { nric, wallet_address: walletAddress });
      setReceipt(response.data.receipt);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const handleCheckMetadata = async (event) => {
    event.preventDefault();

    try {
      const tokenId = receipt.split(':')[0];
      const response = await axios.get(`https://api.opensea.io/api/v1/asset/${process.env.REACT_APP_CONTRACT_ADDRESS}/${tokenId}/`);
      setName(response.data.name);
      setDescription(response.data.description);
      setImage(response.data.image_url);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            NRIC:
            <input type="text" value={nric} onChange={(e) => setNRIC(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Wallet Address:
            <input type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
          </label>
        </div>
        <button type="submit">Claim NFT</button>
      </form>

      {receipt && (
        <div>
          <p>Receipt: {receipt}</p>
          <button onClick={handleCheckMetadata}>Check Metadata</button>
        </div>
      )}

      {name && description && image && (
        <div>
          <NFTMetadata name={name} description={description} />
          <NFTImage image={image} name={name} />
        </div>
      )}
    </div>
  );
}
