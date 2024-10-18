import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import AddDogForm from "./AddDogForm";

interface AddDogDialogProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export default function AddDogDialog({ open, setOpen }: AddDogDialogProps) {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
			<DialogTitle style={{ textAlign: "center" }}>
				הוספת כלב חדש
			</DialogTitle>
			<DialogContent>
				<AddDogForm />
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					סגירה
				</Button>
			</DialogActions>
		</Dialog>
	);
}
