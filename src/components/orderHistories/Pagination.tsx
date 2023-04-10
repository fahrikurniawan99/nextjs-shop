import * as React from "react";
import { Pagination } from "@mui/material";

export default function OrderPagination({
  loading,
  setPage,
  page,
  limit,
  count
}: {
  loading: boolean;
  page: number;
  count: number;
  limit: number
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <Pagination
      disabled={loading}
      count={Math.ceil(count / limit)}
      page={page}
      onChange={(e, value) => setPage(value)}
      style={{ margin: "30px 0" }}
      color={"primary"}
      shape={"rounded"}
    />
  );
}
