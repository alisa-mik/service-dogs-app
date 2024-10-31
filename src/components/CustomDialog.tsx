import { Dialog, DialogContent, DialogActions } from "@mui/material";

interface CustomDialogProps {
  open: boolean;
  children: React.ReactNode;
  title?: string;
}

export default function CustomDialog({ open, children }: CustomDialogProps) {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose} color="secondary">
					סגירה
				</Button> */}
      </DialogActions>
    </Dialog>
  );
}
