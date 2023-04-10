import {
  categoryAtom,
  fetchCategoryAtom,
  productPageAtom,
  tagsSelectedAtom,
} from "@/stores/product";
import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useAtom } from "jotai";
import * as React from "react";

export default function Category() {
  const [categories, fetchCategory] = useAtom(fetchCategoryAtom);
  const [category, setCategory] = useAtom(categoryAtom);
  const [, setPage] = useAtom(productPageAtom);
  const [, setTagsSelected] = useAtom(tagsSelectedAtom);

  React.useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return (
    <Box sx={{ my: 2 }}>
      <Select
        value={category}
        displayEmpty
        onChange={(event: SelectChangeEvent) => {
          setCategory(event.target.value);
          setTagsSelected([]);
          setPage(1 as number);
        }}
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
