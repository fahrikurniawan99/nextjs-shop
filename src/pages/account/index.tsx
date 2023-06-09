import Header from "@/components/Header";
import Auth from "@/components/auth";
import OrderHistories from "@/components/orderHistories";
import axios from "@/config/axiosInstance";
import { authAtom } from "@/stores/auth";
import { cartAtom } from "@/stores/cart";
import { Box, Button, Container, Typography } from "@mui/material";
import { useAtom } from "jotai";
import Head from "next/head";
import * as React from "react";

export default function Account() {
  const [auth, setAuth] = useAtom(authAtom);
  const [loading, setLoading] = React.useState(false);
  const [cart, setCart] = useAtom(cartAtom);

  const handleLogout = () => {
    setLoading(true);
    axios
      .post(
        "/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      )
      .then(() => {
        setLoading(false);
        setCart([]);
        setAuth({
          id: null,
          token: null,
        });
      });
  };

  if (auth.token === null) {
    return <Auth />;
  }

  return (
    <>
      <Head>
        <title>Account</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Container maxWidth="md" sx={{ width: "95%" }}>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant={"h5"} sx={{ mt: 3 }}>
              Welcome Back
            </Typography>
            <Button disabled={loading} onClick={handleLogout}>
              {loading ? "Loading..." : "Logout"}
            </Button>
          </Box>
          <OrderHistories />
        </Container>
      </main>
    </>
  );
}
