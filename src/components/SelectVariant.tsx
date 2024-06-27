import React, { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import { formatter } from "../utils";

interface Props {
  variants: any;
  token: string;
  title: string;
}

const SelectVariant = ({ variants, token, title }: Props) => {
  const [variant, setVariant] = useState(variants.edges[0].node);

  const handleSelectChange = (selectedVariant: any) => {
    const newVariant = variants.edges.find(
      (variant: any) => variant === selectedVariant
    ).node;
    setVariant(newVariant);
  };

  return (
    <div className="flex flex-col max-w-sm w-full">
      <h1 className="bg-gradient-to-r from-[#323A84] via-[#6669BB] to-[#323A84] text-white text-center px-2 py-4 text-4xl">
        {title}
      </h1>
      <div className="grid grid-cols-2">
        <h2 className="text-center text-2xl font-extralight text-gray-500">
          {formatter.format(variant.price.amount)}
        </h2>
        <div className="join justify-end pr-8 mx-auto gap-4 text-2xl bg-gradient-to-r from-10% to-gray-500 rounded-none from-transparent w-full">
          {variants.edges.map((variantItem: any) => (
            <button
              key={variantItem.node.title}
              className={`${
                variantItem.node.title == variant.title
                  ? "text-white"
                  : "text-black"
              }`}
              onClick={() => handleSelectChange(variantItem)}
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
