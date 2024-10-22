import styled from "styled-components";
import { YELLOW } from "../config/colors";
import { deleteDog } from "../services/dogService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { refetchDogs } from "../store/dogsSlice";
// import { toast } from 'react-toastify';

const StyledNav = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url("/placeholder.jpg");
	background-size: 200px 200px;
	background-repeat: repeat;
	opacity: 0.1;
`;

export default function DogProfileNav() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const dog = useSelector((state: RootState) => state.dogProfile.dog);
	if (!dog) {
		return <div>No dog profile available.</div>;
	}
	const { dogId } = dog;

	const handleDelete = () => {
		deleteDog(dogId);
		dispatch(refetchDogs());
		navigate("/app/dogs");
	};

	// const handleDelete = async () => {
	//     const confirmDelete = window.confirm(`Are you sure you want to delete ${dog.dogName}?`);
	//     if (!confirmDelete) return;

	//     try {
	//         await deleteDog(dog.dogId);
	//         toast.success(`Dog ${dog.dogName} deleted successfully.`);
	//         onDelete(dog.dogId);
	//     } catch (error) {
	//         console.error('Error deleting dog:', error);
	//         toast.error('Failed to delete dog. Please try again.');
	//     }
	// };

	return (
		<div style={{ position: "relative", height: "100%", width: "100%" }}>
			<Background />
			<StyledNav>
				<button
					style={{
						// border: "1px solid black",
						backgroundColor: YELLOW,
					}}
				>
					פרופיל{" "}
				</button>
				<button
					style={{
						// border: "1px solid black",
						backgroundColor: YELLOW,
					}}
				>
					גלרייה{" "}
				</button>{" "}
				<button
					style={{
						// border: "1px solid black",
						backgroundColor: YELLOW,
					}}
				>
					תיק רפואי{" "}
				</button>{" "}
				<button
					style={{
						// border: "1px solid black",
						backgroundColor: YELLOW,
					}}
				>
					מסמכים{" "}
				</button>
				<button
					style={{
						// border: "1px solid black",
						backgroundColor: YELLOW,
					}}
				>
					עדכוני משפחה{" "}
				</button>
				<button
					style={{
						// border: "1px solid black",
						backgroundColor: YELLOW,
					}}
					onClick={handleDelete}
				>
					Delete Dog
				</button>
			</StyledNav>
		</div>
	);
}
