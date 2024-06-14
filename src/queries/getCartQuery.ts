const GetCart = `
  query getCartQuery($id: ID!) {
    cart(id: $id) {
      checkoutUrl
    }
  }
`

export default GetCart