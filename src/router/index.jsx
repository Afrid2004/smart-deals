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
import ProductDetails from "../components/ProductDetails";
import Loading from "../components/Loading";
import CreateProduct from "../pages/CreateProduct/CreateProduct";
import AllProducts from "../pages/AllProducts/AllProducts";

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
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://smart-deals-backend-989k.onrender.com/products/${params.id}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          ),
        HydrateFallback: Loading,
      },
      {
        path: "/create-product",
        element: (
          <PrivateRoute>
            <CreateProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
    ],
  },
]);
