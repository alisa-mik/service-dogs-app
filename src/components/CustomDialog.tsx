import {
	Dialog,
	DialogContent,
	DialogActions,
	ModalProps,
} from "@mui/material";
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

	const handleOnClose = (
		e: React.ChangeEvent<HTMLInputElement>,
		reason: "escapeKeyDown" | "backdropClick"
	) => {
		if (reason === "escapeKeyDown") {
			setDialogOpen(false);
			onClose();
		}
	};

	return (
		<Dialog
			open={dialogOpen}
			maxWidth="sm"
			fullWidth
			onClose={handleOnClose}
		>
			<DialogContent>{children}</DialogContent>
			<DialogActions>
				{/* <Button onClick={handleClose} color="secondary">
					סגירה
				</Button> */}
			</DialogActions>
		</Dialog>
	);
}
