import { useSelector } from "react-redux";
import { RootState } from "../store";
import { YELLOW } from "../config/colors";

export default function DogUpdates() {
	const dog = useSelector((state: RootState) => state.dogProfile.dog);
	if (!dog) {
		return <div>No dog profile available.</div>;
	}
	const { updates } = dog;
	return (
		<div>
			<div>עדכונים</div>
			<button
				style={{
					// border: "1px solid black",
					backgroundColor: YELLOW,
				}}
			>
				הוסף עדכון
			</button>
			<div>
				{updates.map((update) => {
					return <div>{update.content}</div>;
				})}
			</div>
		</div>
	);
}
