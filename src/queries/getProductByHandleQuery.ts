const getProductByHandleQuery = `
  query getProductByHandle($handle: String!, $country: CountryCode!) @inContext(country: $country) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      descriptionHtml
      images(first: 5) {
        edges {
          node {
            altText
            url
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            title
            id
            price {
              amount
              currencyCode
            }
          }
        }
      }
      featuredImage {
        url
        altText
      }
    }
  }
`;

export default getProductByHandleQuery;
