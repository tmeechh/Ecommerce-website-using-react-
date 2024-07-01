import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star from '../Assets/star_icon.png';
import star_dull from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { toast } from 'react-hot-toast';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  const [selectedSizes, setSelectedSizes] = useState(() => {
    if (!product) {
      return {
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
        XXL: 0,
      };
    }

    const storedSelectedSizes = localStorage.getItem(
      `selectedSizes_${product.id}`
    );
    return storedSelectedSizes
      ? JSON.parse(storedSelectedSizes)
      : {
          S: 1,
          M: 0,
          L: 0,
          XL: 0,
          XXL: 0,
        };
  });

  if (!product) {
    return null; // or return a loading indicator, or some fallback UI
  }

  const handleSizeClick = (size, increment) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [size]: Math.max(0, prevSizes[size] + increment),
    }));
  };

  const handleAddToCart = () => {
    console.log({ productId: product.id, selectedSizes });
    const newCartItem = { product, selectedSizes };
    let sizeSelected = false;
  
    for (const size in selectedSizes) {
      if (selectedSizes[size] > 0) {
        sizeSelected = true;
        addToCart(newCartItem);
      }
    }
  
    if (!sizeSelected) {
      toast.error('Please select at least one size.');
    }
  };
  

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star_dull} alt="" />
          <p>(4.5)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          {product.description}
        </div>
        <div className="productdisplay-right-size ">
          <h1 className="pb-5">Select Size</h1>
          <div className="gapme flex gap-6 text-center ">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <div key={size}>
                <div className="flex text-center justify-center">
                  <div className="size-button">{size}</div>
                </div>
                <div className="size-button-controls pt-2 mb-[-9px]">
                  <button
                    className="cartbtn  w-12 text-[#ff4141] flex items-center justify-center rounded h-2   text-xl"
                    onClick={() => handleSizeClick(size, -1)}
                  >
                    -
                  </button>
                  <span className="text-sm mb-5">{selectedSizes[size]}</span>
                  <button
                    className="w-12  text-[#ff4141] flex items-center justify-center rounded h-0  text-xl"
                    onClick={() => handleSizeClick(size, 1)}
                  >
                    +
                  </button>
                </div>
                <span className="text-center">
                  {size === 'S' && `$${product.new_price}`}
                  {size === 'M' && `$${product.new_price + 12}`}
                  {size === 'L' && `$${product.new_price + 17}`}
                  {size === 'XL' && `$${product.new_price + 25}`}
                  {size === 'XXL' && `$${product.new_price + 28}`}
                </span>
              </div>
            ))}
          </div>
        </div>
        <button className="addtocart" onClick={handleAddToCart}>
          ADD TO CART
        </button>
        <p className="productdisplay-right-category">
          <span>Category:</span> {product.category}
        </p>
        <p className="productdisplay-right-category">
          <span>Tags:</span> Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
