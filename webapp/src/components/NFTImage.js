import React from 'react';

export default function NFTImage(props) {
  return (
    <div>
      <img src={props.image} alt={props.name} />
    </div>
  );
}
