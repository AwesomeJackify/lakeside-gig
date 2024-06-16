import React, { useEffect, useState } from "react";

import { createClient } from "../utils";

import getCartQuery from "../queries/getCartQuery";
import removeCartLinesQuery from "../queries/removeCartLinesQuery";
import { $totalQuantity } from "../../stores/cartStore";

interface Props {
  token: string;
}

const CartItems = ({ token }: Props) => {
  const [shopifyCart, setShopifyCart] = useState({} as any);
  const [cartItems, setCartItems] = useState([] as any);

  useEffect(() => {
    const getCart = async () => {
      const { data } = await createClient(token).request(getCartQuery, {
        variables: {
          id: localStorage.getItem("cartId"),
        },
      });
      setShopifyCart(data);

      if (data.cart) {
        data.cart.lines.edges.forEach((line: any) => {
          setCartItems((prevItems: any) => [
            ...prevItems,
            {
              product: line.node.merchandise.product.title,
              variant: line.node.merchandise.title,
              quantity: line.node.quantity,
              id: line.node.id,
            },
          ]);
        });
      }
    };

    getCart();
  }, []);

  const handleDeleteCartItem = async (
    lineId: string,
    quantityToRemove: number
  ) => {
    const { data } = await createClient(token).request(removeCartLinesQuery, {
      variables: {
        cartId: shopifyCart.cart.id,
        lineIds: [lineId],
      },
    });

    if (data) {
      setCartItems((prevItems: any) =>
        prevItems.filter((item: any) => item.id !== lineId)
      );

      $totalQuantity.set($totalQuantity.get() - quantityToRemove);
    }
  };

  const handleCheckout = async () => {
    window.location.href = shopifyCart.cart.checkoutUrl;
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col">
        {cartItems.map((cartItem: any) => (
          <div className="flex gap-4" key={cartItem.id}>
            <h3>{cartItem.product}</h3>
            <h3>{cartItem.variant}</h3>
            <p>Quantity: {cartItem.quantity}</p>
            <button
              onClick={() =>
                handleDeleteCartItem(cartItem.id, cartItem.quantity)
              }
            >
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
