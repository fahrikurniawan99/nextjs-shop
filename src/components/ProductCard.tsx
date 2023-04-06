import { ShoppingCartOutlined } from "@ant-design/icons";
import { Typography, Grid, Box, Paper, Chip, Button } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function ProductCard({
  name,
  image_url,
  category,
  tags,
}: Product) {
  return (
    <Grid item xs={6} sm={4}>
      <Paper sx={{ height: 350 }}>
        <Box
          sx={{
            position: "relative",
            width: "50%",
            height: 170,
            mx: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            alt={image_url.split("/").pop() ?? "products"}
            src={image_url}
            width={50}
            height={50}
            layout={"responsive"}
          />
        </Box>
        <Box p={2}>
          <Typography variant={"h6"}>{name}</Typography>
          <Typography variant={"subtitle2"}>{category.name}</Typography>
          <Box sx={{width: "100%", overflowX:"auto", mt:1}}> 
            {tags.map((tag) => (
              <Chip label={tag.name} />
            ))}
          </Box>
          <Button
            variant={"contained"}
            sx={{ width: "100%", mt: 2 }}
            endIcon={<ShoppingCartOutlined />}
          >
            Tambah
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
