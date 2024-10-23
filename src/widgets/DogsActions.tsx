import { useState } from "react";
import { Button } from "../components/commonParts/Buttons";
import CustomDialog from "../components/CustomDialog";
import AddDogForm from "../components/AddDog/AddDogForm";

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
				<CustomDialog
					open={open}
					setOpen={setOpen}
					title="הוספת כלב חדש"
				>
					<AddDogForm />
				</CustomDialog>
				<Button>הוספת קבוצה חדשה</Button>
				<Button>לארכיון</Button>
			</div>
			<div>
				<img style={{ width: "90%" }} src="/dogs.jpg" alt="dogs" />
			</div>
		</div>
	);
}
