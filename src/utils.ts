import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const createClient = (publicAccessToken: string) => {
  return createStorefrontApiClient({
    storeDomain: "http://0b4091-a4.myshopify.com",
    apiVersion: "2023-10",
    publicAccessToken: publicAccessToken,
    customFetchApi: fetch,
  });
}

export const formatter = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});