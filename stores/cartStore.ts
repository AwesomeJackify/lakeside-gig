import { atom, map } from 'nanostores';

export const cartItems = map({});

export function addToCart(product: any) {
  const existingEntry = cartItems.get()[product.id];
  if (existingEntry) {
    cartItems.setKey(product.id, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    })
  } else {
    cartItems.setKey(
      product.id,
      { data: product, quantity: 1 }
    );
  }
}

export function removeFromCart(product: any) {
  const newCart: { [key: string]: any } = { ...cartItems.get() };
  delete newCart[product.id];
  cartItems.set(newCart);
  localStorage.setItem("cart", JSON.stringify(newCart));
}