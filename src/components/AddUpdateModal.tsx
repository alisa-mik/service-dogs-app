import React from "react";
import { Modal, Box } from "@mui/material";
import AddUpdateForm from "./AddUpdateForm"; // The form component you'll create below

interface AddUpdateModalProps {
	dogId: string;
	open: boolean;
	handleClose: () => void;
}

const AddUpdateModal: React.FC<AddUpdateModalProps> = ({
	dogId,
	open,
	handleClose,
}) => {
	return (
		<Modal open={open} onClose={handleClose}>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 800,
					bgcolor: "background.paper",
					boxShadow: 24,
					p: 4,
				}}
			>
				<AddUpdateForm dogId={dogId} handleClose={handleClose} />
			</Box>
		</Modal>
	);
};

export default AddUpdateModal;
