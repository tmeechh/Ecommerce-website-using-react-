/* eslint-disable no-undef */
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios'


export const ShopContext = createContext(null);
const url = 'http://localhost:4000/api';

const getDefaultCart = (products) => {
  let cart = {};
  products.forEach((product) => {
    cart[product.id] = { total: 0, sizes: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 } };
  });
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([]);
  const [token, setToken] = useState(() => {
    return JSON.parse(localStorage.getItem('auth-token')) || null;
  });
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
  });


  // console.log(cartItems);

  useEffect(() => {
    fetch(url + '/products/allproducts')
      .then((response) => response.json())
      .then((data) => {
        setAll_product(data);
        if (localStorage.getItem('auth-token')) {
          const savedCartItems = localStorage.getItem('cartItems');
          if (savedCartItems) {
            try {
              setCartItems(JSON.parse(savedCartItems));
            } catch (error) {
              console.error('Failed to parse saved cart items:', error);
            }
          }
        }
        // setCartItems(getDefaultCart(data));
      });
  }, []);


  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url+"/users/addtocart",{itemId},{headers:{token}})
    }
  };


    
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  
    if (token) {
      try {
        const response = await axios.post(
          url + "/users/removefromcart",
          { itemId },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error removing item from cart:', error.response ? error.response.data : error.message);
      }
    } else {
      console.error('No token available');
    }
  };
  
    
//  const sendCartToDB = async (cartData) => {
//     if (!token) {
//       console.log('No token available');
//       return;
//     }

//     console.log('Starting to send cart to DB...');
//     console.log({ cartData });

//     try {
//       const response = await fetch(url + '/users/addtocart', {
//         method: 'POST',
//         headers: {
//           'auth-token': token,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(cartData),
//       });
//       if (!response.ok) {
//         const errorResponse = await response.json();
//         console.error('Failed to add item to cart', errorResponse);
//         throw new Error('Failed to add item to cart');
//       }
//       const data = await response.json();
//       console.log('Success');
//       console.log(data);
//     } catch (error) {
//       console.error('Error adding item to cart:', error);
//     }
//   };

//   useEffect(() => {
//     if (cartItems.length > 0) {
//       sendCartToDB(cartItems);
//     }
//   }, [cartItems]);

//   const saveCartToLocalStorage = (newCartItems) => {
//     console.log('Saving to localStorage:', newCartItems);
//     localStorage.setItem('cartItems', JSON.stringify(newCartItems));
//   };

//   const addToCart = (newCartItem) => {
//     const existingItemIndex = cartItems.findIndex(
//       (eachItem) => eachItem.product._id === newCartItem.product._id
//     );

//     let newCart;

//     if (existingItemIndex > -1) {
//       newCart = cartItems.map((eachItem, index) =>
//         index === existingItemIndex ? newCartItem : eachItem
//       );
//     } else {
//       newCart = [...cartItems, newCartItem];
//     }

//     setCartItems(newCart);
//     saveCartToLocalStorage(newCart);
//     console.log('Cart updated:', newCart);
//     sendCartToDB(newCart); // Add this line to send the updated cart to the backend
//   };


  // const removeFromCart = (newCartItem) => {
  //   const newCart = cartItems.filter(
  //     (eachItem) => eachItem.product._id !== newCartItem._id
  //   );
  //   saveCartToLocalStorage(newCart);
  //   setCartItems(newCart);
  //   toast.success(`Item removed from cart successfully`);
  // };

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

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    const items = Array.isArray(cartItems) ? cartItems : [];

    items.forEach((item) => {
      if (item.selectedSizes) {
        Object.entries(item.selectedSizes).forEach(([size, quantity]) => {
          if (quantity > 0) {
            const price = getPriceBySize(item.product.new_price, size);
            totalAmount += price * quantity;
          }
        });
      }
    });
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;

    // Ensure cartItems is an array
    const items = Array.isArray(cartItems) ? cartItems : [];

    items.forEach((item) => {
      if (item.selectedSizes) {
        Object.values(item.selectedSizes).forEach((quantity) => {
          totalItems += quantity;
        });
      }
    });

    return totalItems;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
