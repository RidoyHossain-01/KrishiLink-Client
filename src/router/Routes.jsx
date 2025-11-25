import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AllCrops from './../pages/AllCrops/AllCrops';
import MyProfile from './../pages/Profile/MyProfile';
import AddCrops from './../pages/AddCrops/AddCrops';
import MyPosts from "../pages/MyPosts/MyPosts";
import MyInterests from './../pages/MyInterests/MyInterests';
import Login from './../pages/login&register/Login';
import Register from './../pages/login&register/Register';
import PrivateRoute2 from "../layouts/PrivateRoute2";
import PrivateRoute from "../layouts/PrivateRoute";
import CropDetails from "../pages/CropDetails/CropDetails";

export const router = createBrowserRouter([
     {
          path: "/",
          Component:MainLayout,
          children:[
               {
                    path:"/",
                    element:<Home/>
               },
               {
                    path:'/all-crops',
                    element:<AllCrops/>
               },
               {
                    path:'/all-crops/:id',
                   element:<PrivateRoute>
                    <CropDetails/>
                   </PrivateRoute>
               },
               {
                    path:'/profile',
                    Component:MyProfile
               },
               {
                    path:'/add-crops',
                    element:<PrivateRoute>
                         <AddCrops/>
                    </PrivateRoute>
               },
               {
                    path:'/my-posts',
                    element:<PrivateRoute>
                         <MyPosts/>
                    </PrivateRoute>
               },
               {
                    path:'/my-interests',
                    element:<PrivateRoute>
                         <MyInterests/>
                    </PrivateRoute>
               },
               {
                    path:'/login',
                    element:<PrivateRoute2><Login/></PrivateRoute2>
               },
               {
                    path:'/register',
                    element:<PrivateRoute2><Register/></PrivateRoute2>
               }
          ]
     }
]);