import { Dialog, DialogContent, DialogActions } from "@mui/material";

interface CustomDialogProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	children: React.ReactNode;
	title?: string;
}

export default function CustomDialog({
	open,
	setOpen,
	children,
}: CustomDialogProps) {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
			<DialogContent>{children}</DialogContent>
			<DialogActions>
				{/* <Button onClick={handleClose} color="secondary">
					סגירה
				</Button> */}
			</DialogActions>
		</Dialog>
	);
}
