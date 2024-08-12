import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const createClient = (publicAccessToken: string) => {
  return createStorefrontApiClient({
    storeDomain: "http://lakeside-4.myshopify.com",
    apiVersion: "2023-10",
    publicAccessToken: publicAccessToken,
    customFetchApi: fetch,
  });
}

export const formatPrice = (amount: number, currencyCode: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol'
  }).format(amount);
};