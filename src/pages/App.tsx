import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { DogListTable } from "../components/DogListTable";

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const TopBar = styled.div`
	height: 30px;
	background-color: cadetblue;
`;

const Body = styled.div`
	width: 100%;
	flex: 1;
`;

export default function App() {
	return (
		<Container>
			<TopBar />
			<Body>
				<DogListTable />
				<Outlet />
			</Body>
		</Container>
	);
}
