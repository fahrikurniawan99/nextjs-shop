import { Box, Button, Drawer, Paper, Typography } from "@mui/material";
import Image from "next/image";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
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
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {Array.from({ length: 5 }).map((_: any, i: number) => (
            <Paper key={i} sx={{ display: "flex", gap: 1 }}>
              <Image
                src={
                  "https://pos-backend-chi.vercel.app/images/products/4b086942c882c300b11eb03fcaa6b445.png"
                }
                width={80}
                height={80}
                alt={"thumbnail"}
              />
              <div style={{ marginTop: 5 }}>
                <Typography variant="subtitle2">Burger Tripple</Typography>
                <Typography variant="caption">Rp.1000</Typography>
              </div>
            </Paper>
          ))}
        </Box>
        <Button sx={{ width: "100%", mt: 5 }} variant="contained">
          Checkout
        </Button>
      </Box>
    </Drawer>
  );
}
