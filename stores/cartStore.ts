import { atom, map } from 'nanostores';

export const $totalQuantity = atom(0);

export const cartItems = map({});

export function addToCart(product: any) {
  const existingEntry = cartItems.get()[product.id];
  if (existingEntry) {
    cartItems.setKey(product.id, {
      data: {
        ...existingEntry.data,  // Copy the existing product data
        quantity: existingEntry.data.quantity + product.quantity  // Increment the quantity inside the product data
      }
    })
  } else {
    cartItems.setKey(
      product.id,
      { data: product }
    );
  }

  console.log(cartItems.get())

  localStorage.setItem("cart", JSON.stringify(cartItems.get()));
}

export function removeFromCart(product: any) {
  console.log(product)
  const newCart: { [key: string]: any } = { ...cartItems.get() };
  delete newCart[product.data.id];
  cartItems.set(newCart);

  localStorage.setItem("cart", JSON.stringify(cartItems.get()));
}