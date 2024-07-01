import React, { useContext } from 'react';
import './CartItem.css';
import { ShopContext } from '../../Context/ShopContext';

import { TrashIcon } from '@heroicons/react/16/solid';

const CartItems = () => {
  const { getTotalCartAmount, cartItems, removeFromCart } =
    useContext(ShopContext);

  const handleRemoveFromCart = (product) => {
    removeFromCart(product,);
  };

  const getPriceBySize = (basePrice, size) => {
    const sizePriceMap = {
      S: basePrice,
      M: basePrice + 12,
      L: basePrice + 17,
      XL: basePrice + 25,
      XXL: basePrice + 28,
    };
    return sizePriceMap[size] || basePrice;
  };

  const getProductQuantity = (selectedSizes) => {
    let total = 0;
    Object.values(selectedSizes).map((number) => (total += number));
    return total;
  };

  const items = Array.isArray(cartItems) ? cartItems : [];

  return (
    <div className="cartitems">
      {items.map(({ product, selectedSizes }) => {
        const itemTotalPrice = Object.entries(selectedSizes).reduce(
          (total, [size, quantity]) => {
            if (quantity > 0) {
              const price = getPriceBySize(product.new_price, size);
              total += price * quantity;
            }
            return total;
          },
          0
        );
        return (
          <div key={product.id}>
            <div className="cartitems-format cartitems-format-main">
              <img
                src={product.image}
                alt=""
                className="carticon-product-icon"
              />
              <p>{product.name}</p>
              <p>${product.new_price}</p>
              <button className="cartitems-quantity">
                {getProductQuantity(selectedSizes)}
              </button>
              <p className="newprice2">${itemTotalPrice}</p>
              <div className="w-6 h-6 cursor-pointer">
                <TrashIcon onClick={() => handleRemoveFromCart(product)} />
              </div>
            </div>
            <div className="flex gap-4">
              {Object.entries(selectedSizes).map(
                ([size, quantity]) =>
                  quantity > 0 && (
                    <div key={size} className="size-details border">
                      <span className="font-extrabold">{size}</span>
                      <span>: {quantity}</span>
                    </div>
                  )
              )}
            </div>
            <hr />
          </div>
        );
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
