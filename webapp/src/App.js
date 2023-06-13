import React, { useState, useEffect } from 'react';
import './index.css';
import NFTImage from './components/NFTImage';
import NFTMetadata from './components/NFTMetadata';
import ClaimNFT from './components/ClaimNFT';

function App() {
  const [nftData, setNFTData] = useState({
    id: '',
    name: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    async function fetchNFTData() {
      const response = await fetch('/api/nft');
      const data = await response.json();
      setNFTData(data);
    }

    fetchNFTData();
  }, []);

  return (
    <div>
      <ClaimNFT />
      <NFTImage image={nftData.image} name={nftData.name} />
      <NFTMetadata name={nftData.name} description={nftData.description} />
    </div>
  );
}

export default App;
