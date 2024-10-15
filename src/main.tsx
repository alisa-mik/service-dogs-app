import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// import ErrorPage from "./pages/ErrorPage";
import DogProfile from "./pages/DogProfile";
import FamilyDashboard from "./pages/FamilyDashboard";
import Root from "./Root";
import App from "./pages/App";
import Login from "./pages/Login";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
	{
		path: "/",
		Component: Root,
		children: [
			{ path: "login", Component: Login },
			{
				path: "app",
				Component: App,
				children: [
					{
						path: "dogs/:id",
						Component: DogProfile,
					},
				],
			},
			{
				path: "/family",
				Component: FamilyDashboard,
			},
		],
	},
]);

root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
