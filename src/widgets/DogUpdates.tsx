// import { useSelector } from "react-redux";
// import { RootState } from "../store";
import { useSelector } from "react-redux";
import { YELLOW } from "../config/colors";
import { RootState } from "../store";

export default function DogUpdates() {
	const { updates } = useSelector((state: RootState) => state.updatesByDogId);
	return (
		<div>
			<div>עדכונים</div>
			<button
				style={{
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
