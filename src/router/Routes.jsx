import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
const Home = lazy(() => import("../pages/Home/Home"));
const AllCrops = lazy(() => import("./../pages/AllCrops/AllCrops"));
const CropDetails = lazy(() => import("../pages/CropDetails/CropDetails"));

import MyProfile from "./../pages/Profile/MyProfile";
import AddCrops from "./../pages/AddCrops/AddCrops";
import MyPosts from "../pages/MyPosts/MyPosts";
import MyInterests from "./../pages/MyInterests/MyInterests";
import Login from "./../pages/login&register/Login";
import Register from "./../pages/login&register/Register";
import PrivateRoute2 from "../layouts/PrivateRoute2";
import PrivateRoute from "../layouts/PrivateRoute";
import ErrorElement from "../components/ErrorElement";
import Loader from "../components/Loader";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/all-crops",
        element: (
          <Suspense fallback={<Loader />}>
            <AllCrops />
          </Suspense>
        ),
      },
      {
        path: "/all-crops/:id",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loader />}>
              <CropDetails />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-crops",
        element: (
          <PrivateRoute>
            <AddCrops />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-posts",
        element: (
          <PrivateRoute>
            <MyPosts />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-interests",
        element: (
          <PrivateRoute>
            <MyInterests />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PrivateRoute2>
            <Login />
          </PrivateRoute2>
        ),
      },
      {
        path: "/register",
        element: (
          <PrivateRoute2>
            <Register />
          </PrivateRoute2>
        ),
      },
    ],
  },
]);
