import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";

interface CustomDialogProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}

export default function CustomDialog({
  open,
  onClose,
  children,
}: CustomDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(open);

  useEffect(() => {
    setDialogOpen(open);
  }, [open]);

  const handleOnClose = (reason: "escapeKeyDown" | "backdropClick") => {
    if (reason === "escapeKeyDown") {
      setDialogOpen(false);
      onClose();
    }
  };

  return (
    <Dialog open={dialogOpen} maxWidth="sm" fullWidth onClose={handleOnClose}>
      <DialogContent>{children}</DialogContent>
      {/* <DialogActions></DialogActions> */}
    </Dialog>
  );
}
