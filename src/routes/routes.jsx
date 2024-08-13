// routes.js
// import App from "../App";
import Panel from "../screens/Panel/Panel";
import { ProtectedRoute } from "./ProtectedRoute";
import ManageBooks from "../screens/Panel/ManageBooks";
import ManageBlogs from "../screens/Panel/ManageBlogs";
import ManageCourses from "../screens/Panel/ManageCourses";
import ManageTeachers from "../screens/Panel/ManageTeachers";
import ManageUsers from "../screens/Panel/ManageUsers";
import Login from "../screens/Login/Login";
import { Navigate } from "react-router-dom";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin-panel",
    element: (
      <ProtectedRoute>
        <Panel />
      </ProtectedRoute>
    ),
    children: [
      {
        element: <ManageBooks />,
        path: "books",
      },
      {
        element: <ManageBlogs />,
        path: "blogs",
      },
      {
        element: <ManageCourses />,
        path: "courses",
      },
      {
        element: <ManageTeachers />,
        path: "teachers",
      },
      {
        element: <ManageUsers />,
        path: "users",
      },
    ],
  },
  {
    path: "/*",
    element: <Navigate to="/login" />,
  },
];

export { routes };
