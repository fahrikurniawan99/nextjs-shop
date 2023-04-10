import { cartAtom } from "@/stores/cart";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Box, IconButton } from "@mui/material";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

export default function Menu({
  handleOpen,
  openDrawer,
}: {
  handleOpen: () => void;
  openDrawer: () => void;
}) {
  const router = useRouter();
  const [cart] = useAtom(cartAtom)

  return (
    <Box display={"flex"} color={"GrayText"}>
      <IconButton
        sx={{ display: { xs: "flex", sm: "none" } }}
        onClick={handleOpen}
      >
        <SearchOutlined style={{ fontSize: "1.2rem" }} />
      </IconButton>
      <IconButton onClick={openDrawer}>
        <Badge badgeContent={cart.length} color="primary">
          <ShoppingCartOutlined style={{ fontSize: "1.2rem" }} />
        </Badge>
      </IconButton>
      <IconButton onClick={() => router.push("/account")}>
        <UserOutlined style={{ fontSize: "1.2rem" }} />
      </IconButton>
    </Box>
  );
}
