import React, { useState, type ReactNode } from "react";

import { removeFromCart, cartItems } from "../../stores/cartStore";

const cartStr = localStorage.getItem("cart");
const cart = cartStr ? JSON.parse(cartStr) : {};

const CartITems = () => {
  const [cartItems, setCartItems] = useState(
    Object.keys(cart).map((key) => ({
      id: key,
      ...cart[key],
    }))
  );

  const handleDeleteCartItem = (cartItem: any) => {
    removeFromCart(cartItem);
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== cartItem.id)
    );
  };

  return (
    <div className="flex flex-col">
      {cartItems.map((cartItem) => (
        <div className="flex gap-4">
          <h3>{cartItem.title}</h3>
          <p>Quantity: {cartItem.quantity}</p>
          <button onClick={() => handleDeleteCartItem(cartItem)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default CartITems;
