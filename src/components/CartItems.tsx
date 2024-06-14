import React, { useEffect, useState } from "react";

import { removeFromCart, cartItems } from "../../stores/cartStore";
import { createClient } from "../../utils";

import createCartQuery from "../../queries/createCartQuery";
import getCartQuery from "../../queries/getCartQuery";
import addCartLinesQuery from "../../queries/addCartLinesQuery";

const cartStr = localStorage.getItem("cart");
const cart = cartStr ? JSON.parse(cartStr) : {};

interface Props {
  token: string;
}

const CartItems = ({ token }: Props) => {
  const [shopifyCart, setShopifyCart] = useState({} as any);

  useEffect(() => {
    const createCart = async () => {
      const { data, errors, extensions } = await createClient(token).request(
        createCartQuery
      );

      setShopifyCart(data);
    };

    createCart();
  }, []);

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

  const handleCheckout = async () => {
    if (Object.entries(shopifyCart).length !== 0) {
      const { data, errors, extensions } = await createClient(token).request(
        addCartLinesQuery,
        {
          variables: {
            cartId: shopifyCart.cartCreate.cart.id,
            lines: cartItems.map((cartItem: any) => ({
              merchandiseId: cartItem.id,
              quantity: cartItem.quantity,
            })),
          },
        }
      );

      window.location.href = data.cartLinesAdd.cart.checkoutUrl;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col">
        {cartItems.map((cartItem) => (
          <div className="flex gap-4" key={cartItem.id}>
            <h3>{cartItem.data.title}</h3>
            <p>Quantity: {cartItem.quantity}</p>
            <button onClick={() => handleDeleteCartItem(cartItem)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => handleCheckout()}
        className={`btn btn-primary w-fit ${
          cartItems.length === 0 && "hidden"
        }`}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartItems;
