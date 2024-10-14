import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import AdminDashboard from "./pages/AdminDashboard";
import ErrorPage from "./pages/ErrorPage";
import DogProfile from "./components/DogProfile";
import FamilyDashboard from "./pages/FamilyDashboard";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<Provider store={store}>
		<Router>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/admin" element={<AdminDashboard />} />
				<Route path="/family" element={<FamilyDashboard />} />
				<Route path="/error" element={<ErrorPage />} />
				<Route path="/dogs/:id" element={<DogProfile />} />
			</Routes>
		</Router>
	</Provider>
);
