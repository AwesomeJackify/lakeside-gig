import React, { useEffect, useState } from "react";

import { createClient, formatter } from "../utils";

import getCartQuery from "../queries/getCartQuery";
import removeCartLinesQuery from "../queries/removeCartLinesQuery";
import { $totalQuantity } from "../../stores/cartStore";

interface Props {
  token: string;
}

const CartItems = ({ token }: Props) => {
  const [shopifyCart, setShopifyCart] = useState({} as any);
  const [cartItems, setCartItems] = useState([] as any);

  useEffect(() => {
    const getCart = async () => {
      const { data } = await createClient(token).request(getCartQuery, {
        variables: {
          id: localStorage.getItem("cartId"),
        },
      });
      setShopifyCart(data);
      console.log(data);

      if (data.cart) {
        data.cart.lines.edges.forEach((line: any) => {
          setCartItems((prevItems: any) => [
            ...prevItems,
            {
              product: line.node.merchandise.product.title,
              image: line.node.merchandise.product.featuredImage.url,
              variant: line.node.merchandise.title,
              quantity: line.node.quantity,
              price: line.node.merchandise.price.amount,
              id: line.node.id,
            },
          ]);
        });
      }
    };
    getCart();
  }, []);

  const handleDeleteCartItem = async (
    lineId: string,
    quantityToRemove: number
  ) => {
    const { data } = await createClient(token).request(removeCartLinesQuery, {
      variables: {
        cartId: shopifyCart.cart.id,
        lineIds: [lineId],
      },
    });

    if (data) {
      setCartItems((prevItems: any) =>
        prevItems.filter((item: any) => item.id !== lineId)
      );

      $totalQuantity.set($totalQuantity.get() - quantityToRemove);
    }
  };

  const handleCheckout = async () => {
    window.location.href = shopifyCart.cart.checkoutUrl;
  };

  return (
    <div className="grid grid-cols-2 max-w-screen-xl mx-auto">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Item</th>
              <th></th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((cartItem: any, index: number) => (
              <tr key={cartItem.product}>
                <th>
                  <img
                    src={cartItem.image}
                    width={100}
                    height={100}
                    className="object-contain mx-auto"
                    alt={cartItem.product}
                  />
                </th>
                <td>
                  {cartItem.product}
                  <br />
                  {cartItem.variant}
                </td>
                <td>{cartItem.quantity}</td>
                <td>{formatter.format(cartItem.price)}</td>
                <td>
                  <button
                    onClick={() =>
                      handleDeleteCartItem(cartItem.id, cartItem.quantity)
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col max-w-md mx-auto w-full gap-8">
        <div>
          <h1 className="font-light">SUBTOTAL</h1>
          <h2 className="text-4xl">
            {shopifyCart.cart &&
              formatter.format(shopifyCart.cart.cost.subtotalAmount.amount)}
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleCheckout}
            className="w-full border-[1px] py-1 rounded-sm border-gray-500 hover:bg-black transition hover:text-white"
          >
            Continue To Checkout
          </button>
          <p className="text-center font-light text-xs">
            SHIPPING AND TAXES WILL BE CALCULATED ON CHECKOUT. DUTIES AND IMPORT
            FEES MAY BE REQUIRED.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
