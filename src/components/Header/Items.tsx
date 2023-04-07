import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Box, IconButton } from "@mui/material";
import { useRouter } from "next/router";

export default function Menu({
  handleOpen,
  openDrawer,
}: {
  handleOpen: () => void;
  openDrawer: () => void;
}) {
  const router = useRouter();

  return (
    <Box display={"flex"} color={"GrayText"}>
      <IconButton
        sx={{ display: { xs: "flex", sm: "none" } }}
        onClick={handleOpen}
      >
        <SearchOutlined style={{ fontSize: "1.2rem" }} />
      </IconButton>
      <IconButton onClick={openDrawer}>
        <Badge badgeContent={4} color="primary">
          <ShoppingCartOutlined style={{ fontSize: "1.2rem" }} />
        </Badge>
      </IconButton>
      <IconButton onClick={() => router.push("/account")}>
        <UserOutlined style={{ fontSize: "1.2rem" }} />
      </IconButton>
    </Box>
  );
}
