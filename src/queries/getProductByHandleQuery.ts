const getProductByHandleQuery = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      descriptionHtml
      images(first:5) {
        edges {
          node {
            altText
            url
          }
        }
      }
      variants(first:10) {
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
`

export default getProductByHandleQuery;