import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const createClient = (publicAccessToken: string) => {
  return createStorefrontApiClient({
    storeDomain: "http://0b4091-a4.myshopify.com",
    apiVersion: "2023-10",
    publicAccessToken: publicAccessToken,
    customFetchApi: fetch,
  });
}