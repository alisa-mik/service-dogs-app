import { useEffect, useState } from "react";
import { BROWN_DARK } from "../config/colors";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function DogsStats() {
	const {
		dogs,
		// status: dogStatus,
		// error: dogError,
	} = useSelector((state: RootState) => state.dogs);

	const [count, setCount] = useState<number>(0);
	const target = dogs.length;
	const duration = 2000;

	useEffect(() => {
		const stepTime = Math.ceil(duration / target);

		const interval = setInterval(() => {
			setCount((prevCount) => {
				if (prevCount < target) {
					return prevCount + 1;
				} else {
					clearInterval(interval);
					return prevCount;
				}
			});
		}, stepTime);

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
