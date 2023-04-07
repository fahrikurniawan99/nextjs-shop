import { atom } from "jotai";

interface ProductState {
  count: number;
  data: Product[];
  page: number;
  limit: number;
  category: string;
  tags: Tag[];
  query: string
}

export const productState = atom<ProductState>({
  data: [],
  count: 0,
  page: 1,
  limit: 6,
  category: "",
  tags: [],
  query: ""
});
