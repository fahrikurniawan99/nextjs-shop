import { CartItem, cartAtom } from "@/stores/cart";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Typography, Grid, Box, Paper, Chip, Button } from "@mui/material";
import { useAtom } from "jotai";
import Image from "next/image";
import React from "react";

export default function ProductCard({
  name,
  image_url,
  category,
  tags,
  price,
  _id,
}: Product) {
  const [cart, setCart] = useAtom(cartAtom);
  const auth = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth") as string)
    : {};
  const handleAddCart = () => {
    const item: CartItem = {
      name,
      image_url,
      price,
      product: _id,
      qty: 1,
      user: auth?.userId,
    };
    setCart([...cart, item]);
    alert("Success add cart item")
  };

  return (
    <Grid item xs={6} sm={4}>
      <Paper sx={{ height: 400 }}>
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
          <Typography variant={"subtitle1"}>{price}</Typography>
          <Typography variant={"subtitle2"}>{category.name}</Typography>
          <Box sx={{ width: "100%", overflowX: "auto", mt: 1 }}>
            {tags.map((tag) => (
              <Chip label={tag.name} key={tag._id} />
            ))}
          </Box>
          <Button
          disabled={cart.some(item => item.product === _id)}
            variant={"contained"}
            sx={{ width: "100%", mt: 2 }}
            endIcon={<ShoppingCartOutlined />}
            onClick={handleAddCart}
          >
            Tambah
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
