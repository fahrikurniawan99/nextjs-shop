import { fetchProductAtom, productPageAtom } from "@/stores/product";
import { Pagination } from "@mui/material";
import { useAtom } from "jotai";

export default function ProductPagination({ loading }: { loading: boolean }) {
  const [page, setPage] = useAtom(productPageAtom);
  const [{ count, limit }] = useAtom(fetchProductAtom);

  return (
    <Pagination
      disabled={loading}
      count={Math.ceil(count / limit)}
      page={page}
      onChange={(e, value) => setPage(value)}
      style={{ margin: "30px 0" }}
      color={"primary"}
      shape={"rounded"}
    />
  );
}
