import { CartItem } from "@/stores/cart";
import axios from "@/config/axiosInstance";
import * as React from "react";

export default async function handleCheckout(
  {
    setLoading,
    items,
    token,
  }: {
    items: CartItem[];
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    token: string;
  },
  callback: () => void
) {
  setLoading(true);
  try {
    const response = await axios.put(
      "/api/carts",
      { items },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    callback();
  } catch (error: any) {
    if (error?.response?.data?.message) {
      return alert(error.response.data.message);
    }
    alert("something wrong!");
  } finally {
    setLoading(false);
  }
}
