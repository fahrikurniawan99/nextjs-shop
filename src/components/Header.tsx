import {
  Badge,
  Box,
  Container,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import Link from "next/link";
import {
  ShoppingCartOutlined,
  UserOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import * as React from "react";
import useToggle from "@/hooks/useToggle";
import { useAppContext } from "@/context";

export default function Header() {
  const {
    open: isOpen,
    onOpen: handleOpen,
    onClose: handleClose,
  } = useToggle();
  const { setQuery, query } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        width: "95%",
        padding: "1rem 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {!isOpen ? (
        <>
          <Link href={"/"} style={{ fontSize: "1.8rem", fontWeight: 700 }}>
            Shop
          </Link>
          <Paper
            component={"form"}
            sx={{
              margin: "0px auto",
              width: { sm: 300, md: 500 },
              p: "3px 1rem",
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
            }}
          >
            <SearchOutlined style={{ fontSize: 17 }} />
            <InputBase
              onChange={handleChange}
              value={query}
              placeholder={"masukan yang ingin kamu cari?"}
              sx={{ ml: 2, width: "100%" }}
            />
          </Paper>
          <Box display={"flex"} color={"GrayText"}>
            <IconButton
              sx={{ display: { xs: "flex", sm: "none" } }}
              onClick={handleOpen}
            >
              <SearchOutlined style={{ fontSize: "1.2rem" }} />
            </IconButton>
            <IconButton>
              <Badge badgeContent={4} color="primary">
                <ShoppingCartOutlined style={{ fontSize: "1.2rem" }} />
              </Badge>
            </IconButton>
            <IconButton>
              <UserOutlined style={{ fontSize: "1.2rem" }} />
            </IconButton>
          </Box>
        </>
      ) : (
        <Paper
          component={"form"}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            p: "4px 6px",
          }}
        >
          <SearchOutlined style={{ fontSize: 17 }} />
          <InputBase
            placeholder={"masukan yang ingin kamu cari?"}
            sx={{ ml: 2, width: "100%" }}
          />
          <CloseOutlined
            style={{ fontSize: 17, cursor: "pointer" }}
            onClick={handleClose}
          />
        </Paper>
      )}
    </Container>
  );
}
