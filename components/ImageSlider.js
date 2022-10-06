import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function ImageSlider() {
  const images = ["/meal1.jpeg", "/meal2.jpeg", "/meal4.jpeg"];
  return (
    <div>
      <Slide>
        <div className="each-slide-effect">
          <div style={{ backgroundImage: `url(${images[0]})` }}></div>
        </div>
        <div className="each-slide-effect">
          <div style={{ backgroundImage: `url(${images[1]})` }}></div>
        </div>
        <div className="each-slide-effect">
          <div style={{ backgroundImage: `url(${images[2]})` }}></div>
        </div>
      </Slide>
    </div>
  );
}

export default ImageSlider;
