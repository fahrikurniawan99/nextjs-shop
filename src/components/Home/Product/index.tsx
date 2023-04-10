// import { productAtom } from "@/stores/product";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useAtom } from "jotai";
import * as React from "react";
import ProductPagination from "./ProductPagination";
import ProductsList from "./ProductsList";
import {
  categoryAtom,
  fetchProductAtom,
  productPageAtom,
  tagsSelectedAtom,
} from "@/stores/product";

export default function Product() {
  const [{ loading }, fetchProducts] = useAtom(fetchProductAtom);
  const [category] = useAtom(categoryAtom);
  const [page] = useAtom(productPageAtom);
  const [tags] = useAtom(tagsSelectedAtom)

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts, category, page, tags]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress sx={{ mx: "auto" }} />
      </Box>
    );
  }

  return (
    <>
      <ProductsList />
      <ProductPagination loading={loading} />
    </>
  );
}
