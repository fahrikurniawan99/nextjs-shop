import { productState } from "@/stores/product";
import { Pagination } from "@mui/material";
import { useAtom } from "jotai";

export default function ProductPagination({ loading }: { loading: boolean }) {
  const [product, setProduct] = useAtom(productState);

  return (
    <Pagination
      disabled={loading}
      count={product.count}
      page={product.page}
      onChange={(e, value) => setProduct({ ...product, page: value })}
      style={{ margin: "30px 0" }}
      color={"primary"}
      shape={"rounded"}
    />
  );
}
