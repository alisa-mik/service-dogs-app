import { Outlet } from "react-router-dom";
import styled from "styled-components";
// import { DogListTable } from "../components/DogListTable";
import AppNavigation from "../components/AppNavigation";
import { useState } from "react";
import { TOP_BAR_HIGHT } from "../constants";
import MenuIcon from "@mui/icons-material/menu";

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const TopBar = styled.div`
	height: ${TOP_BAR_HIGHT}px;
	background-color: cadetblue;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 0 10px;
`;

const Body = styled.div`
	width: 100%;
	overflow: auto;
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

export default function App() {
	const [open, setOpen] = useState(false);

	const handleNavClose = () => {
		setOpen(false);
	};
	return (
		<Container>
			<TopBar>
				<MenuIcon
					onClick={() => setOpen(!open)}
					sx={{ width: 40, height: 40, cursor: "pointer" }}
				/>
			</TopBar>
			<Body>
				<AppNavigation open={open} onClose={handleNavClose} />
				<Outlet />
			</Body>
		</Container>
	);
}
