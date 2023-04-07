import useToggle from "@/hooks/useToggle";
import { Chip } from "@mui/material";
import * as React from "react";

interface SChipProps {
  onDelete: () => void;
  onClick: () => void;
  isDeletable: boolean ;
  label: string;
}

export default function SChip({
  onClick,
  onDelete,
  isDeletable,
  label,
}: SChipProps) {
  return isDeletable ? (
    <Chip label={label} onDelete={onDelete} />
  ) : (
    <Chip variant={"outlined"} label={label} onClick={onClick} />
  );
}
