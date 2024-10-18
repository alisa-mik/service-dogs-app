import { useState } from "react";
import AddDogDialog from "../components/AddDogDialog";
import { YELLOW } from "../config/colors";

export default function DogsActions() {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				height: "100%",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "10px",
				}}
			>
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
				<button
					style={{
						// border: "1px solid black",
						backgroundColor: YELLOW,
					}}
				>
					הוספת קבוצה חדשה
				</button>
				<button
					style={{
						// border: "1px solid black",
						backgroundColor: YELLOW,
					}}
				>
					לארכיון
				</button>
			</div>
			<div>
				<img style={{ width: "90%" }} src="/dogs.jpg" alt="dogs" />
			</div>
		</div>
	);
}
