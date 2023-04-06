import * as React from "react";

export default function useToggle() {
  const [open, setOpen] = React.useState<boolean>(false);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);
  return { open, onClose, onOpen };
}
