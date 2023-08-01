import React from 'react';
import './style.css';
import { Carousel } from 'react-carousel-minimal';
import img1 from './Img/8G9PJA14T3FN1566592377439.jpg';
import img2 from './Img/csGo2312312.png';
import img3 from './Img/kayadaek_big_belly_batman_dressed_like_santa_claus_drinking_mar_888fa69c-00ef-4883-8e28-58d176d514ab.jpg';
import img4 from './Img/xkWsLGFb5BcHoERUDMtZ9b.jpg';
import img5 from './Img/d1177fc80e0d4a618e5ad6c3ab4a619a.jpg';
import img6 from './Img/Dota2_ClashofHeroes.jpg';
import img7 from './Img/dota-2-doom-dota2-games.jpg';
import img8 from './Img/709a2fabfead3859_1920xH.jpg';
import img9 from './Img/23.webp';

export default function Sliders() {
  const data = [
    {
      image: img1,
    },
    {
      image: img2,
    },
    {
      image: img3,
    },
    {
      image: img4,
    },
    {
      image: img5,
    },
    {
      image: img6,
    },
    {
      image: img7,
    },
    {
      image: img8,
    },
    {
      image: img9,
    },
  ];
  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  };
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  };

  return (
    <div className="App1">
    <div style={{ textAlign: 'center' }}>
      <div style={{
        padding: '0 20px',
      }}
      >
        <Carousel
          data={data}
          time={3000}
          width="850px"
          height="500px"
          captionStyle={captionStyle}
          radius="10px"
          slideNumber
          slideNumberStyle={slideNumberStyle}
          captionPosition="bottom"
          automatic
          dots
          pauseIconColor="white"
          pauseIconSize="40px"
          slideBackgroundColor="darkgrey"
          slideImageFit="cover"
          thumbnails
          thumbnailWidth="100px"
          style={{
            cursor: 'pointer',
            textAlign: 'center',
            maxWidth: '850px',
            maxHeight: '500px',
            margin: '40px auto',
          }}
        />
      </div>
    </div>
    </div>

  );
}
