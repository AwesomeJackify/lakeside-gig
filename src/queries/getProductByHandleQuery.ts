const getProductByHandleQuery = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      descriptionHtml
      variants(first:10) {
        edges {
          node {
            title
            id
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