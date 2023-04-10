import useToggle from "@/hooks/useToggle";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Container, InputBase, Paper } from "@mui/material";
import Link from "next/link";
import HeaderItems from "./Items";
import SearchBar from "./SearchBar";
import CartDrawer from "../ui/CartDrawer";


export default function Header() {
  const {
    open: isOpen,
    onOpen: handleOpen,
    onClose: handleClose,
  } = useToggle();
  const {
    open: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useToggle();


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
      {/* {!isOpen ? (
        <> */}
          <Link href={"/"} style={{ fontSize: "1.8rem", fontWeight: 700 }}>
            Shop
          </Link>
          {/* <SearchBar /> */}
          <HeaderItems handleOpen={handleOpen} openDrawer={openDrawer}  />
        {/* </>
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
      )} */}
      <CartDrawer open={isDrawerOpen} onClose={closeDrawer} />
    </Container>
  );
}
