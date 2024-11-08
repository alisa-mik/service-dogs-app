import React from "react";
import { Modal, Box } from "@mui/material";
import AddUpdateForm from "./AddUpdateForm"; // The form component you'll create below

interface AddUpdateModalProps {
  dogId?: string | undefined;
  open: boolean;
  handleClose: () => void;
}

const AddUpdateModal: React.FC<AddUpdateModalProps> = ({
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
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <AddUpdateForm handleClose={handleClose} />
      </Box>
    </Modal>
  );
};

export default AddUpdateModal;
