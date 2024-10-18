import { useEffect, useState } from "react";
import { BROWN_DARK } from "../config/colors";
import { useFetchDogs } from "../hooks/useFetchDogs";

export default function DogsStats() {
	const { dogs, loading, error } = useFetchDogs();
	const [count, setCount] = useState<number>(0);
	const target = dogs.length; // Replace this with the actual number of dogs in your app
	const duration = 2000; // Total animation time in milliseconds (e.g., 2 seconds)

	useEffect(() => {
		// Calculate the time interval for each increment
		const stepTime = Math.ceil(duration / target); // Time per step, adjust based on total number

		const interval = setInterval(() => {
			setCount((prevCount) => {
				if (prevCount < target) {
					return prevCount + 1; // Increment by 1
				} else {
					clearInterval(interval); // Stop the interval when the target is reached
					return prevCount;
				}
			});
		}, stepTime);

		// Cleanup interval on component unmount
		return () => clearInterval(interval);
	}, [target, duration]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				// alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#fff",
			}}
		>
			<div
				style={{ fontSize: "45px", fontWeight: 600, color: BROWN_DARK }}
			>
				{count}
			</div>
			<div>כלבים רשומים במערכת</div>
		</div>
	);
}
