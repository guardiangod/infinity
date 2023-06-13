import React from 'react';

export default function NFTMetadata(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.description}</p>
    </div>
  );
}
