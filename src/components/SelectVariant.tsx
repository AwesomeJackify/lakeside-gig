import React, { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import { formatPrice, createClient } from "../utils";
import getProductByHandleQuery from "../queries/getProductByHandleQuery";
import { DEFAULT_COUNTRY } from "../utils";

interface Props {
  token: string;
  handle: string;
}

const SelectVariant = ({ token, handle }: Props) => {
  const [data, setData] = useState<any>(null);
  const [variant, setVariant] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await createClient(token).request(
          getProductByHandleQuery,
          {
            variables: {
              handle: handle,
              country:
                localStorage.getItem("currentCountry") || DEFAULT_COUNTRY,
            },
          }
        );
        setData(data);
        setVariant(data?.productByHandle?.variants?.edges[0]?.node); // Set the initial variant
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token, handle]);

  const handleButtonChange = (selectedVariant: any) => {
    const newVariant = data.productByHandle.variants.edges.find(
      (variant: any) => variant === selectedVariant
    ).node;
    setVariant(newVariant);
  };

  const handleSelectChange = (event: any) => {
    const title = event.target.value;
    const newVariant = data.productByHandle.variants.edges.find(
      (variant: any) => variant.node.title === title
    ).node;
    setVariant(newVariant);
  };

  if (!data || !variant) {
    return <div>Loading...</div>; // Or some other loading state UI
  }

  return (
    <div className="flex flex-col max-w-sm w-full gap-2">
      <h1 className="text-black text-start max-md:text-center max-md:text-2xl text-base">
        {data.productByHandle.title}
      </h1>
      <div className="grid grid-cols-2 place-items-start">
        <div className="flex items-center justify-center w-full">
          <h2 className="text-center text-2xl font-extralight ">
            {formatPrice(variant.price.amount, variant.price.currencyCode)}
          </h2>
        </div>

        <div className="join max-md:mr-4 text-lg rounded-none from-transparent w-full max-lg:grid max-lg:grid-cols-2">
          {data.productByHandle.variants.edges.map((variantItem: any) => (
            <button
              key={variantItem.node.title}
              className={`w-10 ${
                variantItem.node.title === variant.title
                  ? "rounded-lg border-2 border-black"
                  : "text-black"
              }`}
              onClick={() => handleButtonChange(variantItem)}
            >
              {variantItem.node.title}
            </button>
          ))}
        </div>
      </div>
      <AddToCart token={token} variantId={variant.id} />
    </div>
  );
};

export default SelectVariant;
