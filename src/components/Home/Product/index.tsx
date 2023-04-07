import { productState } from "@/stores/product";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useAtom } from "jotai";
import * as React from "react";
import ProductPagination from "./ProductPagination";
import ProductsList from "./ProductsList";

export default function Product() {
  const [product, setProduct] = useAtom(productState);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    product.data.length && setLoading(false);
    setLoading(true);
    axios(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      params: {
        limit: product.limit,
        skip: (product.page - 1) * product.limit,
        category: product.category,
        tags: product.tags.map((tag) => tag.name),
      },
    }).then((res) => {
      setLoading(false);
      setProduct({
        ...product,
        data: res.data.data,
        count: Math.ceil(res.data.count / product.limit),
      });
    });

    return () => {};
  }, [product.page, product.category, product.limit, product.tags]);

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
