import { useState } from "react";
import AddDogDialog from "../components/AddDogDialog";
import { YELLOW } from "../config/colors";

export default function AddDog() {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<div>
			<button
				onClick={() => setOpen(true)}
				style={{
					// border: "1px solid black",
					backgroundColor: YELLOW,
				}}
			>
				הוספת כלב
			</button>
			<AddDogDialog open={open} setOpen={setOpen} />
		</div>
	);
}
