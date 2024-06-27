import React, { useEffect, useState } from "react";
import AddToCart from "./AddToCart";

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

  const formatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <div className="flex flex-col max-w-sm">
      <h1 className="bg-gradient-to-r from-[#323A84] via-[#6669BB] to-[#323A84] text-white text-center px-2 py-4 text-4xl">
        {title}
      </h1>
      <div className="grid grid-cols-2">
        <h2 className="text-center text-4xl font-extralight text-gray-500">
          {formatter.format(variant.price.amount)}
        </h2>
        <div className="join justify-end pr-8 mx-auto gap-4 text-3xl bg-gradient-to-r from-10% to-gray-500 rounded-none from-transparent w-full">
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
