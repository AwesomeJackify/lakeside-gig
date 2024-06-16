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
      className="btn btn-sm w-fit h-full"
      onClick={() => handleAddToCart(variantId, token)}
    >
      Add To Cart
    </button>
  );
};

export default AddToCart;
