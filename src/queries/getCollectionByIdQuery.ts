const getCollectionByIdQuery = `
  query getCollectionByIdQuery($id: ID!) {
    collection(id: $id) {
      id
      title
      handle
      updatedAt
      products(first:10) {
        edges {
          cursor
          node {
            images(first:2) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first:10) {
              edges {
                node {
                  title
                  id
                }
              }
            }
            title
            featuredImage{
              url
            }
            id
            handle
          }
        }
        pageInfo{
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export default getCollectionByIdQuery;