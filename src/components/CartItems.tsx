import React, { useEffect, useState } from "react";

import { removeFromCart, cartItems, clearCart } from "../../stores/cartStore";
import { createClient } from "../utils";

import createCartQuery from "../queries/createCartQuery";
import addCartLinesQuery from "../queries/addCartLinesQuery";
import { useStore } from "@nanostores/react";

interface Props {
  token: string;
}

const CartItems = ({ token }: Props) => {
  const [shopifyCart, setShopifyCart] = useState({} as any);
  const $cartItems = useStore(cartItems);

  useEffect(() => {
    const createCart = async () => {
      const { data } = await createClient(token).request(createCartQuery);

      setShopifyCart(data);
    };

    createCart();
  }, []);

  const handleDeleteCartItem = (cartItem: any) => {
    removeFromCart(cartItem);
  };

  const handleCheckout = async () => {
    console.log($cartItems);
    if (Object.entries(shopifyCart).length !== 0) {
      const { data } = await createClient(token).request(addCartLinesQuery, {
        variables: {
          cartId: shopifyCart.cartCreate.cart.id,
          lines: Object.entries($cartItems).map(
            ([id, cartItem]: [string, any]) => ({
              merchandiseId: cartItem.data.id,
              quantity: cartItem.data.quantity,
            })
          ),
        },
      });

      window.location.href = data.cartLinesAdd.cart.checkoutUrl;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col">
        {Object.entries($cartItems).map(([id, cartItem]: [string, any]) => (
          <div className="flex gap-4" key={id}>
            <h3>{cartItem.data.product}</h3>
            <h3>{cartItem.data.variant}</h3>
            <p>Quantity: {cartItem.data.quantity}</p>
            <button onClick={() => handleDeleteCartItem(cartItem)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => handleCheckout()}
        className={`btn btn-primary w-fit ${
          Object.keys($cartItems).length === 0 && "hidden"
        }`}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartItems;
