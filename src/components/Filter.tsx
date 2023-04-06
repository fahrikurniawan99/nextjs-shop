import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import * as React from "react";

interface FilterProps {
  currentCategory: string;
  categories: Category[];
  handleChange: (value: string) => void;
}

export default function Filter({
  currentCategory,
  categories,
  handleChange,
}: FilterProps) {
  return (
    <Box sx={{ my: 2 }}>
      <Select
        value={currentCategory}
        displayEmpty
        onChange={(event: SelectChangeEvent) =>
          handleChange(event.target.value)
        }
        inputProps={{ "aria-label": "Without label" }}
        sx={{ fontSize: 14, width: 150, height: 35 }}
        renderValue={(selected: string) => {
          if (selected.length === 0) {
            return <span>Category</span>;
          }
          return selected
        }}
      >
        <MenuItem value={""}>default</MenuItem>
        {categories.map((category) => (
          <MenuItem value={category.name} key={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
