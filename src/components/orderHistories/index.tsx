import axios from "@/config/axiosInstance";
import { authAtom } from "@/stores/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import * as React from "react";
import { format } from "date-fns";
import OrderPagination from "./Pagination";

interface Order {
  order_number: string;
  items_count: number;
  status: string;
  order_items: Array<any>;
  delivery_address: {
    provinsi: string;
    kota: string;
    detail: string;
  };
  createdAt: string;
}

export default function OrderHistories() {
  return (
    <TableContainer sx={{ mt: 1 }}>
      <Table aria-label="simple table" sx={{}}>
        <TableHeading
          cell={[
            "Order Number",
            "Date",
            "Total Item",
            "Status",
            "Total",
            "Delivery Address",
          ]}
        />
        <TableData />
      </Table>
    </TableContainer>
  );
}

const TableHeading = ({ cell }: { cell: string[] }) => {
  return (
    <TableHead>
      <TableRow>
        {cell.map((name: string, index: number) => (
          <TableCell key={index}>{name}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const TableData = () => {
  const [auth] = useAtom(authAtom);
  const [orders, setOrders] = React.useState<null | Order[]>(null);
  const loading = orders === null ? true : false;
  const [count, setCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const LIMIT = 5;

  React.useEffect(() => {
    setOrders(null);
    axios
      .get("/api/orders", {
        params: {
          limit: LIMIT,
          skip: (page - 1) * LIMIT,
        },
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => {
        setOrders(res.data.data);
        setCount(res.data.count);
      });
  }, [page]);

  return (
    <TableBody>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : orders?.length ? (
        orders.map((order, index) => {
          const total = order.order_items.reduce(
            (cur, prev) => cur + prev.price * prev.qty,
            0
          );
          return (
            <TableRow key={index}>
              <TableCell>{order?.order_number}</TableCell>
              <TableCell>
                {format(new Date(order?.createdAt as string), "yyyy-MM-dd")}
              </TableCell>
              <TableCell>{order?.items_count}</TableCell>
              <TableCell>{order?.status}</TableCell>
              <TableCell>{total}</TableCell>
              <TableCell>{`${order.delivery_address.provinsi} ${order.delivery_address.kota}`}</TableCell>
            </TableRow>
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={5}>You have never placed an order</TableCell>
        </TableRow>
      )}
      <TableRow>
        <TableCell colSpan={5}>
          <OrderPagination
            limit={LIMIT}
            count={count}
            loading={loading}
            page={page}
            setPage={setPage}
          />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
