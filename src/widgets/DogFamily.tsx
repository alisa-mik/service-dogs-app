import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function DogFamily() {
	const dog = useSelector((state: RootState) => state.dogProfile.dog);
	if (!dog) {
		return <div>No dog profile available.</div>;
	}
	const { assignedFamilyId } = dog;
	return (
		<div>
			<div>המשפחה שלי</div>
			<div>{assignedFamilyId}</div>
		</div>
	);
}
