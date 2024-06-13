export const CollectionQuery = `
  query getCollectionById($id: ID!) {
    collection(id: $id) {
      id
      title
      handle
      updatedAt
      products(first:10) {
        edges {
          cursor
          node {
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