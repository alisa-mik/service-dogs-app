import styled from "styled-components";
import { YELLOW } from "../config/colors";

export default function DogProfileNav() {
	const StyledNav = styled.div`
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 10px;
	`;

	const Background = styled.div`
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url("/placeholder.jpg");
		background-size: 200px 200px;
		background-repeat: repeat;
		opacity: 0.1;
	`;

	return (
		<div style={{ position: "relative", height: "100%", width: "100%" }}>
			<Background />
			<StyledNav>
				<button
					style={{
						// border: "1px solid black",
						backgroundColor: YELLOW,
					}}
				>
					פרופיל{" "}
				</button>
				<button
					style={{
						// border: "1px solid black",
						backgroundColor: YELLOW,
					}}
				>
					גלרייה{" "}
				</button>{" "}
				<button
					style={{
						// border: "1px solid black",
						backgroundColor: YELLOW,
					}}
				>
					תיק רפואי{" "}
				</button>{" "}
				<button
					style={{
						// border: "1px solid black",
						backgroundColor: YELLOW,
					}}
				>
					מסמכים{" "}
				</button>
				<button
					style={{
						// border: "1px solid black",
						backgroundColor: YELLOW,
					}}
				>
					עדכוני משפחה{" "}
				</button>
			</StyledNav>
		</div>
	);
}
