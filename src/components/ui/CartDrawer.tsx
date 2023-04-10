import handleCheckout from "@/libs/handleCheckout";
import { authAtom } from "@/stores/auth";
import { cartAtom } from "@/stores/cart";
import { Box, Button, Drawer, Paper, Typography } from "@mui/material";
import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const [cart, setCart] = useAtom(cartAtom);
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleDeleteItem = (id: string) => {
    setCart(cart.filter((item) => item.product !== id));
  };
  const [auth] = useAtom(authAtom);
  const router = useRouter();

  return (
    <Drawer anchor={"right"} {...{ open, onClose }}>
      <Box
        role="presentation"
        sx={{
          width: 400,
          p: 5,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {!cart.length ? (
          <Typography>No cart item</Typography>
        ) : (
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {cart.map((item, i: number) => (
              <Paper key={i} sx={{ display: "flex", gap: 1 }}>
                <Image
                  src={item.image_url}
                  width={80}
                  height={80}
                  alt={"thumbnail"}
                />
                <div style={{ marginTop: 5 }}>
                  <Typography variant="subtitle2">{item.name}</Typography>
                  <Typography variant="caption">{item.price}</Typography>
                </div>
                <Button
                  onClick={() => handleDeleteItem(item.product)}
                  size="small"
                  sx={{ height: "fit-content", ml: "auto" }}
                >
                  Remove
                </Button>
              </Paper>
            ))}
          </Box>
        )}
        <Button
          sx={{ width: "100%", mt: 5 }}
          variant="contained"
          disabled={loading || !cart.length}
          onClick={() =>
            auth.token === null
              ? alert("Please login")
              : handleCheckout(
                  {
                    setLoading,
                    items: cart,
                    token: auth.token as string,
                  },
                  () => {
                    onClose();
                    router.push("/checkout");
                  }
                )
          }
        >
          {loading ? "Loading..." : "Checkout"}
        </Button>
      </Box>
    </Drawer>
  );
}
