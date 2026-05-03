import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Index";
import Home from "../pages/Home/Index";
import ErrorPage from "../components/ErrorPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import MyProduct from "../pages/MyProduct";
import MyBid from "../pages/MyBid";
import PrivateRoute from "../components/PrivateRoute";
import AuthRoute from "../components/AuthRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthRoute>
            <Login />
          </AuthRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthRoute>
            <Register />
          </AuthRoute>
        ),
      },
      {
        path: "/my-products",
        element: (
          <PrivateRoute>
            <MyProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bids",
        element: (
          <PrivateRoute>
            <MyBid />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
