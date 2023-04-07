import { Button, Paper, Typography } from "@mui/material";
import * as React from "react";

interface AuthFormBaseProps {
  title: string;
  buttonText: string;
  onSubmit: () => void;
  children: React.ReactNode;
  disabled: boolean;
  loading: boolean
}

export default function AuthFormBase({
  title,
  buttonText,
  onSubmit,
  children,
  disabled,
  loading
}: AuthFormBaseProps) {
  return (
    <Paper sx={{ p: 3 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Typography variant={"h4"}>{title}</Typography>
        {children}
        <Button
          disabled={disabled}
          type={"submit"}
          variant="contained"
          sx={{ width: "100%", mt: 2 }}
        >
          {loading ? "loading" : buttonText}
        </Button>
      </form>
    </Paper>
  );
}
