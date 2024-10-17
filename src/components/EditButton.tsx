// src/components/EditButton.tsx
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface EditButtonProps {
	onEdit: () => void;
}

const EditButton = ({ onEdit }: EditButtonProps) => {
	return (
		<IconButton
			sx={{
				position: "absolute",
				top: 16,
				right: 16,
				color: "#264653",
			}}
			onClick={onEdit}
			aria-label="edit"
		>
			<EditIcon />
		</IconButton>
	);
};

export default EditButton;
