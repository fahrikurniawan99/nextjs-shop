import handleRegister from "@/libs/handleRegister";
import { TextField } from "@mui/material";
import * as React from "react";
import AuthFormBase from "../AuthFormBase";

interface FormState {
  full_name: string;
  email: string;
  password: string;
}

export default function Register({
  setIndex,
}: {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [form, setForm] = React.useState<FormState>({
    email: "",
    password: "",
    full_name: "",
  });
  const isValid = form["email"] === "" || form["password"] === "";
  const [loading, setLoading] = React.useState(false);
  const resetForm = () =>
    setForm({
      email: "",
      password: "",
      full_name: "",
    });

  return (
    <AuthFormBase
      disabled={!!isValid || loading}
      buttonText="Register"
      title={"Register"}
      loading={loading}
      onSubmit={() =>
        handleRegister({
          values: form,
          setLoading,
          redirect: () => {
            setIndex(1);
            resetForm();
          },
        })
      }
    >
      <TextField
        required
        value={form.full_name}
        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        sx={{ width: "100%", mt: 2 }}
        variant={"standard"}
        label={"Fullname"}
      />
      <TextField
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        sx={{ width: "100%", mt: 2 }}
        variant={"standard"}
        label={"Email"}
        type="email"
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
