import React, { useEffect } from "react";

import { createClient } from "../utils";

import { $totalQuantity } from "../../stores/cartStore";

import addCartLinesQuery from "../queries/addCartLinesQuery";

const handleAddToCart = async (variantId: string, token: string) => {
  const { data } = await createClient(token).request(addCartLinesQuery, {
    variables: {
      cartId: localStorage.getItem("cartId"),
      lines: [
        {
          quantity: 1,
          merchandiseId: variantId,
        },
      ],
    },
  });

  if (data) {
    let totalQuantity = 0;

    data.cartLinesAdd.cart.lines.edges.forEach((line: any) => {
      totalQuantity += line.node.quantity;
    });

    $totalQuantity.set(totalQuantity);
  }
};

interface Props {
  variantId: string;
  token: string;
}

const AddToCart = ({ variantId, token }: Props) => {
  return (
    <button
      className="w-fit uppercase bg-black text-white p-1 hover:bg-gray-800 transition"
      onClick={() => handleAddToCart(variantId, token)}
    >
      Add To Bag
    </button>
  );
};

export default AddToCart;
