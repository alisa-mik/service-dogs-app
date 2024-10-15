import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { DogList } from "../components/DogList";
import {
	Typography,
	Box,
	Paper,
	Button,
	// Dialog,
	// DialogTitle,
	// DialogContent,
	// DialogActions,
} from "@mui/material"; // MUI components
import { styled } from "styled-components";
// import AddDogForm from "../components/AddDogForm"; // Import the form
import { DogListTable } from "../components/DogListTable";
import AddDogDialog from "../components/AddDogDialog";

// Styled components
const FullPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
	background-color: #f7f8fa;
	padding: 0;
	margin: 0;
	overflow-x: hidden;
`;

const StyledPaper = styled(Paper)`
	padding: 32px;
	border-radius: 12px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	width: 95%;
	max-width: 1200px;
	text-align: center;
	background-color: #fff;
	max-height: 90vh;
	overflow-y: auto;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const AdminDashboard: React.FC = () => {
	const { isAdmin } = useSelector((state: RootState) => state.user);
	const [open, setOpen] = useState<boolean>(false); // State to control modal

	const navigate = useNavigate();

	useEffect(() => {
		if (!isAdmin) {
			navigate("/");
		}
	}, [isAdmin, navigate]);

	// Function to open the modal
	const handleOpen = () => {
		setOpen(true);
	};

	// Function to close the modal

	return (
		<FullPageContainer>
			<StyledPaper>
				<Typography variant="h4" component="h1" gutterBottom>
					Admin Dashboard
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={handleOpen}
					style={{ marginTop: "16px" }}
				>
					Add New Dog
				</Button>
				<Box>
					{/* <DogList /> */}
					<DogListTable />
					<Outlet />
				</Box>

				{/* Modal for adding new dog */}
				<AddDogDialog open={open} setOpen={setOpen} />
			</StyledPaper>
		</FullPageContainer>
	);
};

export default AdminDashboard;
