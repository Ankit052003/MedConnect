import React from 'react';

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium
          doloremque necessitatibus rem repellendus quibusdam excepturi quia
          ducimus omnis laborum fuga vitae dolor minima, in sunt, atque molestias
          quis nesciunt amet sequi aperiam? Aliquam, numquam odio iusto quia facilis
          expedita sunt dolorum quidem voluptates reiciendis? Numquam doloribus
          necessitatibus sint ut minima.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image" />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
