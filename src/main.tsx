import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { SnackbarProvider } from "notistack";

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
// import { ProjectsDashboard } from "./pages/ProjectsDashboard";
import TrainingGroupsDashboard from "./pages/TrainingGroupsDashboard";
// import BreedingDogsDashboard from "./pages/BreedingDogsDashboard";
// import { DogsForSoldiersDashboard } from "./pages/DogsForSoldiersDashboard";
// import { TwoOnFourDashboard } from "./pages/TwoOnFourDashboard";
import { DogsInTrainingDashboard } from "./pages/DogsInTrainingDashboard";
import { errorsIgnore } from "./utils/errorsIgnore";
import FamilyUpdatesDashboard from "./pages/FamilyUpdatesDashboard";
import { FamilyLogin } from "./pages/FamilyLogin";

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
            path: "groups",
            Component: TrainingGroupsDashboard,
          },
          {
            path: "family-updates",
            Component: FamilyUpdatesDashboard,
          },
          // {
          //   path: "2-on-4",
          //   Component: TwoOnFourDashboard,
          // },
          // {
          //   path: "dogs-for-soldiers",
          //   Component: DogsForSoldiersDashboard,
          // },
          {
            path: "dogs-in-training",
            Component: DogsInTrainingDashboard,
          },
        ],
      },
      {
        path: "family",
        Component: FamilyDashboard,
      },
    ],
  },
  {
    path: "/family-login",
    Component: FamilyLogin,
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

errorsIgnore();

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        autoHideDuration={3000}
        preventDuplicate={true}
      />
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
