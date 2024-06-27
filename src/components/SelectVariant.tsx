import React, { useEffect, useState } from "react";
import AddToCart from "./AddToCart";

interface Props {
  variants: any;
  token: string;
}

const SelectVariant = ({ variants, token }: Props) => {
  const [variant, setVariant] = useState(variants.edges[0].node);

  const handleSelectChange = (event: any) => {
    const title = event.target.value;
    const newVariant = variants.edges.find(
      (variant: any) => variant.node.title === title
    ).node;
    setVariant(newVariant);
  };

  return (
    <div className="flex items-center gap-4 flex-col">
      <select
        className="select select-bordered max-w-xs w-fit"
        onChange={(e) => handleSelectChange(e)}
        value={variant.title}
      >
        {variants.edges.map((variant: any) => (
          <option key={variant.node.title} value={variant.node.title}>
            {variant.node.title}
          </option>
        ))}
      </select>
      <AddToCart token={token} variantId={variant.id} />
    </div>
  );
};

export default SelectVariant;
