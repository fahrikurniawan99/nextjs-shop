import axios from "axios";
import * as React from "react";

interface Values {
  email: string;
  password: string;
}

export default async function handleLogin({
  values,
  setLoading,
}: {
  values: Values;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  setLoading(true);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      values
    );
    alert("login success!");
    localStorage.setItem("token", response.data.token);
    window.location.reload()
  } catch (error: any) {
    if (error.response.data.message) {
      return alert(error.response.data.message);
    }
    alert("something wrong!");
  } finally {
    setLoading(false);
  }
}
