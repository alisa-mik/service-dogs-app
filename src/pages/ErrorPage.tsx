import React from "react";

const ErrorPage: React.FC = () => {
	return (
		<div style={{ textAlign: "center", marginTop: "50px" }}>
			<h1>Error: Invalid Token Data</h1>
			<p>
				The user information is incomplete or invalid. Please try
				logging in again.
			</p>
			<button onClick={() => (window.location.href = "/")}>
				Go to Home
			</button>
		</div>
	);
};

export default ErrorPage;
