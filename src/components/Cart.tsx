import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useStore } from "@nanostores/react";

import { createClient } from "../utils";

import getCartQuery from "../queries/getCartQuery";
import createCartQuery from "../queries/createCartQuery";

import { $totalQuantity } from "../../stores/cartStore";

interface Props {
  token: string;
}

// store the cart id in local storage. if it returns null, make a new cart object. This could mean
// that the user has just checked out.
const Cart = ({ token }: Props) => {
  const totalQuantity = useStore($totalQuantity);

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");

    const createCart = async () => {
      const { data } = await createClient(token).request(createCartQuery);
      return data;
    };

    const getCart = async () => {
      const { data } = await createClient(token).request(getCartQuery, {
        variables: {
          id: cartId,
        },
      });

      return data;
    };

    const calculateAndSetTotalQuantity = (cart: any) => {
      const lines = cart.lines.edges;
      let totalQuantity = 0;

      lines.forEach((line: any) => {
        totalQuantity += line.node.quantity;
      });

      $totalQuantity.set(totalQuantity);
    };

    const initialiseCart = async () => {
      if (!cartId) {
        const data = await createCart();
        localStorage.setItem("cartId", data.cartCreate.cart.id);
      } else {
        const data = await getCart();
        if (!data.cart) {
          const data = await createCart();
          localStorage.setItem("cartId", data.cartCreate.cart.id);
        } else {
          calculateAndSetTotalQuantity(data.cart);
        }
      }
    };

    initialiseCart();
  }, []);

  return (
    <a className="relative" href="/cart">
      <Icon icon="mdi:cart-outline" className="text-5xl" />

      <div className="badge badge-sm absolute bottom-0 right-0">
        {totalQuantity}
      </div>
    </a>
  );
};

export default Cart;
