import React, { useEffect } from "react";

import { addToCart } from "../../stores/cartStore";

const handleAddToCart = (variant: VariantCartItem) => {
  // also sets local storage
  addToCart(variant);
};

interface Props {
  variant: VariantCartItem;
}

const AddToCart = ({ variant }: Props) => {
  return (
    <button
      className="btn btn-sm w-fit h-full"
      onClick={() => handleAddToCart(variant)}
    >
      Add To Cart
    </button>
  );
};

export default AddToCart;
