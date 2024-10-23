import styled from "styled-components";
import { deleteDog } from "../services/dogService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { refetchDogs } from "../store/dogsSlice";
import { Button } from "../components/commonParts/Buttons";
// import { toast } from 'react-toastify';

const StyledNav = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 10px;
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
			<StyledNav>
				<Button>פרופיל</Button>
				<Button>גלרייה</Button>
				<Button>תיק רפואי</Button>
				<Button>מסמכים</Button>
				<Button>עדכוני משפחה</Button>
				<Button onClick={handleDelete}>הסר</Button>
			</StyledNav>
		</div>
	);
}
