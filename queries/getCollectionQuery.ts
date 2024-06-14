const getCollectionQuery = `
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

export default getCollectionQuery;