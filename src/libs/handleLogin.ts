import axios from "@/config/axiosInstance";
import * as React from "react";

interface Values {
  email: string;
  password: string;
}

export default async function handleLogin({
  values,
  setLoading,
  setAuth,
}: {
  values: Values;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAuth: ({ token, id }: { token: string; id: string }) => void;
}) {
  setLoading(true);
  try {
    const response = await axios.post("/auth/login", values);
    alert("login success!");
    setAuth({ token: response.data.token, id: response.data._id });
    window.location.reload();
  } catch (error: any) {
    if (error.response.data.message) {
      return alert(error.response.data.message);
    }
    alert("something wrong!");
  } finally {
    setLoading(false);
  }
}
