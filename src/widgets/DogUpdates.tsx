// import { useSelector } from "react-redux";
// import { RootState } from "../store";
import { useSelector } from "react-redux";
import { YELLOW } from "../config/colors";
import { RootState } from "../store";
import AddUpdateModal from "../components/AddUpdateModal";
import { useState } from "react";

export default function DogUpdates() {
	const { updates } = useSelector((state: RootState) => state.updatesByDogId);
	const { dog } = useSelector((state: RootState) => state.dogProfile);
	const [open, setOpen] = useState(false);

	if (!dog) return <div>No dog</div>;
	const { dogId } = dog;
	console.log({ updates });

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<div>
			<div>עדכונים</div>
			<button
				style={{
					backgroundColor: YELLOW,
				}}
				onClick={handleOpen}
			>
				הוסף עדכון
			</button>
			<AddUpdateModal
				dogId={dogId}
				open={open}
				handleClose={handleClose}
			/>
			<div>
				{updates.map((update) => {
					return <div>{update.content}</div>;
				})}
			</div>
		</div>
	);
}
