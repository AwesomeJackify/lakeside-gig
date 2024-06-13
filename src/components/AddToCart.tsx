import React, { useEffect } from "react";

import { addToCart, cartItems } from "../../stores/cartStore";

const handleAddToCart = (product: any) => {
  addToCart(product);
  addToCartLocalStorage(product);
};

function addToCartLocalStorage(product: any) {
  // Retrieve the cart from localStorage and parse it into an object
  const cartStr = localStorage.getItem("cart");
  const cart = cartStr ? JSON.parse(cartStr) : {};

  // Check if the product already exists in the cart
  if (cart[product.id]) {
    // If it exists, increase the quantity
    cart[product.id].quantity += 1;
  } else {
    // If it doesn't exist, add it to the cart with quantity 1
    cart[product.id] = { data: product, quantity: 1 };
  }

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

const AddToCart = ({ product }: { product: any }) => {
  return (
    <button
      className="btn btn-sm w-fit mt-auto"
      onClick={() => handleAddToCart(product)}
    >
      Add To Cart
    </button>
  );
};

export default AddToCart;
