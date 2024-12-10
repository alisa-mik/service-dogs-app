import { Dialog, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface CustomDialogProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}

const Absolute = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;

export default function CustomDialog({
  open,
  onClose,
  children,
}: CustomDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(open);

  useEffect(() => {
    setDialogOpen(open);
  }, [open]);

  const handleOnClose = (
    _event: any,
    reason: "escapeKeyDown" | "backdropClick"
  ) => {
    if (reason === "escapeKeyDown") {
      fireClose();
    }
  };

  const fireClose = () => {
    setDialogOpen(false);
    onClose();
  };

  return (
    <Dialog open={dialogOpen} maxWidth="sm" fullWidth onClose={handleOnClose}>
      <DialogContent>{children}</DialogContent>
      <Absolute onClick={fireClose}>
        <CloseIcon style={{ cursor: "pointer" }} />
      </Absolute>
      {/* <DialogActions></DialogActions> */}
    </Dialog>
  );
}
