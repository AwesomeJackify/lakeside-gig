import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useStore } from "@nanostores/react";

import { addToCart, cartItems } from "../../stores/cartStore";

const Cart = () => {
  const $cartItems = useStore(cartItems);

  useEffect(() => {
    const cartStr = localStorage.getItem("cart");
    const cart = cartStr ? JSON.parse(cartStr) : {};

    // Set the Nano Store with the parsed cart data
    cartItems.set(cart);
  }, []);

  return (
    <a className="relative" href="/cart">
      <Icon icon="mdi:cart-outline" className="text-5xl" />

      <div className="badge badge-sm absolute bottom-0 right-0">
        {
          Object.values($cartItems).reduce(
            (acc, item: any) => acc + item.data.quantity,
            0
          ) as number
        }
      </div>
    </a>
  );
};

export default Cart;
