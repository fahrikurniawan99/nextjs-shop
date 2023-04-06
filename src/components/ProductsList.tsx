import { Box, Grid } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";

interface ProductsListProps {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <Box sx={{ margin: "20px 0" }}>
      <Grid container spacing={{ xs: 1, sm: 5 }}>
        {products?.map((product) => {
          return <ProductCard {...product} />;
        })}
      </Grid>
    </Box>
  );
}
