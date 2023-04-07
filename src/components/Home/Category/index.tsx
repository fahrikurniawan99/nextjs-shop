import { productState } from "@/stores/product";
import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { useAtom } from "jotai";
import * as React from "react";

export default function Category() {
  const [product, setProduct] = useAtom(productState);
  const [categories, setCategories] = React.useState<Category[]>();

  React.useEffect(() => {
    axios(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`).then((res) => {
      setCategories(res.data.data);
    });

    return () => {};
  }, []);

  return (
    <Box sx={{ my: 2 }}>
      <Select
        value={product.category}
        displayEmpty
        onChange={(event: SelectChangeEvent) =>
          setProduct({ ...product, category: event.target.value, page: 1 })
        }
        inputProps={{ "aria-label": "Without label" }}
        sx={{ fontSize: 14, width: 150, height: 35 }}
        renderValue={(selected: string) => {
          if (selected.length === 0) {
            return <span>Category</span>;
          }
          return selected;
        }}
      >
        <MenuItem value={""}>default</MenuItem>
        {categories &&
          categories.map((category) => (
            <MenuItem value={category.name} key={category._id}>
              {category.name}
            </MenuItem>
          ))}
      </Select>
    </Box>
  );
}
