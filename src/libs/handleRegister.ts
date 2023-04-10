import axios from "@/config/axiosInstance";
import * as React from "react";

interface Values {
  full_name: string;
  email: string;
  password: string;
}

export default async function handleRegister({
  values,
  setLoading,
  redirect,
}: {
  values: Values;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  redirect: () => void;
}) {
  setLoading(true);
  try {
    const response = await axios.post("/auth/register", values);
    alert("register success!");
    redirect();
  } catch (error: any) {
    if (error.response.data.message) {
      return alert(error.response.data.message);
    }
    alert("something wrong!");
    console.log(error);
  } finally {
    setLoading(false);
  }
}
