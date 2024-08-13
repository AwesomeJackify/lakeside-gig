import React, { useEffect, useState } from "react";
import { formatPrice, createClient, DEFAULT_COUNTRY } from "../utils";
import getProductByHandleQuery from "../queries/getProductByHandleQuery";

interface Props {
  token: string;
  handle: string;
}

const CountryPrice = ({ token, handle }: Props) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await createClient(token).request(
        getProductByHandleQuery,
        {
          variables: {
            handle: handle,
            country: localStorage.getItem("currentCountry") || DEFAULT_COUNTRY,
          },
        }
      );

      setData(data);
      console.log(data);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {formatPrice(
        data.productByHandle.priceRange.maxVariantPrice.amount,
        data.productByHandle.priceRange.maxVariantPrice.currencyCode
      )}
    </>
  );
};

export default CountryPrice;
