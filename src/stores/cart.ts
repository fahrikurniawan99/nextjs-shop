import { atomWithStorage } from "jotai/utils";

export interface CartItem {
  name: string;
  qty: number;
  price: number;
  image_url: string;
  user: string;
  product: string;
}

export const cartAtom = atomWithStorage<CartItem[]>("carts", []);