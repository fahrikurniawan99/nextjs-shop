import axios from "@/config/axiosInstance";
import { atom } from "jotai";

interface ProductState {
  count: number;
  products: Product[];
  limit: number;
  loading: boolean;
}

const productAtom = atom<ProductState>({
  products: [],
  count: 0,
  limit: 6,
  loading: false,
});
export const fetchProductAtom = atom(
  (get) => get(productAtom),
  async (_get, set) => {
    const product = _get(productAtom);
    const category = _get(categoryAtom);
    const skip = (_get(productPageAtom) - 1) * product.limit;
    const tags = _get(tagsSelectedAtom).map((i) => i.name);
    set(productAtom, { ...product, loading: true });
    const response = await axios.get("/api/products", {
      params: {
        limit: product.limit,
        category,
        skip,
        tags,
      },
    });
    set(productAtom, {
      ...product,
      products: response.data.data,
      count: response.data.count,
      loading: false,
    });
  }
);

export const categoryAtom = atom("");
const categoriesAtom = atom<Category[]>([]);
export const fetchCategoryAtom = atom(
  (get) => get(categoriesAtom),
  async (_get, set) => {
    const response = await axios.get("/api/categories");
    set(categoriesAtom, response.data.data);
  }
);

export const tagsSelectedAtom = atom<Tag[]>([]);
const tagsAtom = atom<Tag[]>([]);
export const fetchTagAtom = atom(
  (get) => get(tagsAtom),
  async (_get, set) => {
    const category = _get(categoryAtom);
    const response = await axios.get("/api/tags", {
      params: { category },
    });
    set(tagsAtom, response.data.data);
  }
);

export const productPageAtom = atom<number>(1);
