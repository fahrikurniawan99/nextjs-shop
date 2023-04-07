import { productState } from "@/stores/product";
import { Box, Grid } from "@mui/material";
import { useAtom } from "jotai";
import ProductCard from "./ProductCard";

export default function ProductsList() {
  const [products] = useAtom(productState);

  return (
    <Box sx={{ margin: "20px 0" }}>
      <Grid container spacing={{ xs: 1, sm: 5 }}>
        {products.data.map((product, index) => {
          return <ProductCard {...product} key={index} />;
        })}
      </Grid>
    </Box>
  );
}
