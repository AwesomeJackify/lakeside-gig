const createCartQuery = `
  mutation createCartQuery($country: CountryCode!) @inContext(country: $country){
    cartCreate(input: {
      buyerIdentity: {
        countryCode: $country
      }
    }){
      cart {
        checkoutUrl
        id
        createdAt
        updatedAt
        lines(first: 10) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`

export default createCartQuery;