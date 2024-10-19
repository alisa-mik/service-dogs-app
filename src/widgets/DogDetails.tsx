import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function DogDetails() {
	const dog = useSelector((state: RootState) => state.dogProfile.dog);
	if (!dog) {
		return <div>No dog profile available.</div>;
	}
	const { name, breed, status, momName } = dog;
	return (
		<div>
			<div>פרטים</div>
			<div>{name}</div>
			<div>{breed}</div>
			<div>{status}</div>
			<div>{momName}</div>
		</div>
	);
}
