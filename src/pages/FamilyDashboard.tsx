import { useSelector } from "react-redux";
import { RootState } from "../store";

const FamilyDashboard = () => {
	// Retrieve userId from the Redux store
	const { userId } = useSelector((state: RootState) => state.user);

	return (
		<div>
			<h1>Welcome to the Family Dashboard</h1>
			{userId ? (
				<div>
					<h2>Family Details</h2>
					<p>User ID: {userId}</p>
				</div>
			) : (
				<p>No family details available.</p>
			)}
		</div>
	);
};

export default FamilyDashboard;
