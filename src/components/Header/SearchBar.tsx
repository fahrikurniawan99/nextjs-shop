import { SearchOutlined } from "@ant-design/icons";
import { InputBase, Paper } from "@mui/material";

export default function SearchBar() {
  return (
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
        placeholder={"masukan yang ingin kamu cari?"}
        sx={{ ml: 2, width: "100%" }}
      />
    </Paper>
  );
}
