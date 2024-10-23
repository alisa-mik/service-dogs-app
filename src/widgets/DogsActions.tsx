import { useState } from "react";
import AddDogDialog from "../components/AddDogDialog";
import { Button } from "../components/commonParts/Buttons";

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
				<Button onClick={() => setOpen(true)}>הוספת כלב</Button>
				<AddDogDialog open={open} setOpen={setOpen} />
				<Button>הוספת קבוצה חדשה</Button>
				<Button>לארכיון</Button>
			</div>
			<div>
				<img style={{ width: "90%" }} src="/dogs.jpg" alt="dogs" />
			</div>
		</div>
	);
}
