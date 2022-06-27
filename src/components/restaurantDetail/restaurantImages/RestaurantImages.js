import React from "react";
import "./RestaurantImages.scss";

function RestaurantImages() {
  let imageURL1 = `https://source.unsplash.com/random/?restaurant`;
  let imageURL2 = `https://source.unsplash.com/random/?food`;
  let imageURL3 = `https://source.unsplash.com/random/?dining`;
  return (
    <div className="container">
      <div className="container_left">
        <img src={imageURL1} />
      </div>

      <div className="container_rightOne">
        <img src={imageURL2} />
      </div>

      <div className="container_rightTwo">
        <img src={imageURL3} />
      </div>
    </div>
  );
}

export default RestaurantImages;
