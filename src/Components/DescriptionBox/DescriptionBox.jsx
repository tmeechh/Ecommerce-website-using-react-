import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="description-nav-box">Description</div>
        <div className="description-nav-box fade">Reviews(100)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          An e-commerce website is an online platform that allows businesses to
          sell products or services over the internet. It typically includes
          features such as product listings, shopping carts, and secure payment
          options, enabling users to browse, select, and purchase items without
          the need to visit a physical store.
        </p>
        <p>
          E-commerce websites typically display products or services along with
          detailed descriptions, images, prices, and any available variations
          (eg.sizes, color) Each product has its own dedicated page with
          relevant information.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
