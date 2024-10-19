import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function DogSummary() {
	const dog = useSelector((state: RootState) => state.dogProfile.dog);

	if (!dog) {
		return <div>No dog profile available.</div>;
	}
	const { summary } = dog;

	return (
		<div>
			<div>התרשמות</div>
			<div>{summary}</div>
		</div>
	);
}
