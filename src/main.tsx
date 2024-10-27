import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// import ErrorPage from "./pages/ErrorPage";
import FamilyDashboard from "./pages/FamilyDashboard";
import Root from "./Root";
import App from "./pages/App";
import Login from "./pages/Login";
import MainDashboard from "./pages/MainDashboard";
import DogProfile from "./pages/DogProfile";
import DogDashboard from "./pages/DogsDashboard";
import UpdatesDashboard from "./pages/UpdatesDashboard";
import { createTheme, ThemeProvider } from "@mui/material";
import { TOASTED_PINE_NUT, YELLOW } from "./config/colors";
import { ProjectsDashboard } from "./pages/ProjectsDashboard";

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
            path: "main",
            Component: MainDashboard,
          },
          {
            path: "dogs",
            Component: DogDashboard,
          },
          {
            path: "dogs/:dogId",
            Component: DogProfile,
          },
          {
            path: "families",
            Component: FamilyDashboard,
          },
          {
            path: "updates",
            Component: UpdatesDashboard,
          },
          {
            path: "projects",
            Component: ProjectsDashboard,
          },
        ],
      },
      {
        path: "family",
        Component: FamilyDashboard,
      },
    ],
  },
]);

const theme = createTheme({
  palette: {
    primary: {
      main: YELLOW,
    },
    secondary: {
      main: TOASTED_PINE_NUT,
    },
  },
});

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
