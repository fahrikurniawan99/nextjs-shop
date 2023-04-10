import { Box, Button, TextField } from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
import axios from "@/config/axiosInstance";
import { useAtom } from "jotai";
import { authAtom } from "@/stores/auth";
import { useRouter } from "next/router";
import { cartAtom } from "@/stores/cart";
import Link from "next/link";

interface Values {
  provinsi: string;
  kota: string;
  detail: string;
}

export default function FormCheckout({ disabled }: { disabled: boolean }) {
  const [loading, setLoading] = React.useState(false);
  const defaultValues = {
    provinsi: "",
    kota: "",
    detail: "",
  };
  const [auth] = useAtom(authAtom);
  const router = useRouter();
  const [, setCart] = useAtom(cartAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (data: Values) => {
    setLoading(true);
    const body = {
      delivery_fee: 0,
      delivery_address: data,
    };
    await axios.post("/api/orders", body, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    alert("Congratulations order success!");
    setLoading(false);
    setCart([]);
    router.push("/account");
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{ mt: 1, display: "flex", gap: 3, flexWrap: "wrap", width: "100%" }}
      >
        <TextField
          sx={{ width: "45%" }}
          {...register("provinsi", {
            required: "Kolom perlu di isi",
            minLength: { value: 4, message: "Value minimal 4 karakter" },
          })}
          label="Provinsi"
          error={errors.provinsi ? true : false}
          helperText={errors.provinsi?.message}
        />
        <TextField
          sx={{ width: "45%" }}
          {...register("kota", {
            required: "Kolom perlu di isi",
            minLength: { value: 4, message: "Value minimal 4 karakter" },
          })}
          label="kota"
          error={errors.kota ? true : false}
          helperText={errors.kota?.message}
        />
        <TextField
          sx={{ width: "45%" }}
          {...register("detail", {
            minLength: { value: 4, message: "Value minimal 4 karakter" },
          })}
          label="Detail"
          error={errors.detail ? true : false}
          helperText={errors.detail?.message}
        />
      </Box>
      <Button
        disabled={loading || disabled}
        type={"submit"}
        sx={{ display: "flex", width: "100%", mt: 3 }}
        variant={"contained"}
      >
        {loading ? "Loading..." : "Create order"}
      </Button>
      <Link href={"/"}>Back to home</Link>
    </Box>
  );
}
