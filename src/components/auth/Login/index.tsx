import handleLogin from "@/libs/handleLogin";
import { TextField } from "@mui/material";
import * as React from "react";
import AuthFormBase from "../AuthFormBase";
import { useAtom } from "jotai";
import { authAtom } from "@/stores/auth";

interface FormState {
  email: string;
  password: string;
}

export default function Login() {
  const [form, setForm] = React.useState<FormState>({
    email: "",
    password: "",
  });
  const isValid = form["email"] === "" || form["password"] === "";
  const [loading, setLoading] = React.useState(false);
  const [auth, setAuth] = useAtom(authAtom)

  return (
    <AuthFormBase
      buttonText="Login"
      title={"Login"}
      disabled={!!isValid || loading}
      onSubmit={() => handleLogin({ values: form, setLoading, setAuth:(value) => setAuth(value)})}
      loading={loading}
    >
      <TextField
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        sx={{ width: "100%", mt: 2 }}
        variant={"standard"}
        label={"Email"}
        type={"email"}
      />
      <TextField
        required
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        sx={{ width: "100%", mt: 2 }}
        variant={"standard"}
        label={"Password"}
      />
    </AuthFormBase>
  );
}
