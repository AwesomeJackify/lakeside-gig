import React, { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import { formatPrice } from "../utils";

interface Props {
  variants: any;
  token: string;
  title: string;
}

const SelectVariant = ({ variants, token, title }: Props) => {
  const [variant, setVariant] = useState(variants.edges[0].node);

  const handleButtonChange = (selectedVariant: any) => {
    const newVariant = variants.edges.find(
      (variant: any) => variant === selectedVariant
    ).node;
    setVariant(newVariant);
  };

  const handleSelectChange = (event: any) => {
    const title = event.target.value;
    const newVariant = variants.edges.find(
      (variant: any) => variant.node.title === title
    ).node;
    setVariant(newVariant);
  };

  return (
    <div className="flex flex-col max-w-sm w-full gap-2">
      <h1 className="text-black text-start max-md:text-center max-md:text-2xl text-base">
        {title}
      </h1>
      <div className="grid grid-cols-2 place-items-center">
        <div className="flex items-center justify-center w-full">
          <h2 className="text-center text-2xl font-extralight ">
            {formatPrice(variant.price.amount, variant.price.currencyCode)}
          </h2>
        </div>

        <div className="join justify-end pr-8 mx-auto gap-1 text-2xl rounded-none from-transparent w-full">
          {variants.edges.map((variantItem: any) => (
            <button
              key={variantItem.node.title}
              className={`aspect-square w-12 ${
                variantItem.node.title == variant.title
                  ? "rounded-full border-2 bg-slate-200"
                  : "text-black"
              }`}
              onClick={() => handleButtonChange(variantItem)}
            >
              {variantItem.node.title[0]}
            </button>
          ))}
        </div>
      </div>
      <AddToCart token={token} variantId={variant.id} />
    </div>
  );
};

export default SelectVariant;
