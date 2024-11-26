// App.jsx
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./screens/Login/Login";
import Panel from "./screens/Panel/Panel";
import Dashboard from "./screens/Panel/Dashboard";
import ManageBlogs from "./screens/Panel/ManageBlogs";
import ManageCourses from "./screens/Panel/ManageCourses";
import ManageBooks from "./screens/Panel/ManageBooks";
import ManageTeachers from "./screens/Panel/ManageTeachers";
import ManageUsers from "./screens/Panel/ManageUsers";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/admin-panel/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        {isAuthenticated ? (
          <Route path="/admin-panel" element={<Panel />}>
            <Route path="/admin-panel/dashboard" element={<Dashboard />} />
            <Route path="/admin-panel/blogs" element={<ManageBlogs />} />
            <Route path="/admin-panel/courses" element={<ManageCourses />} />
            <Route path="/admin-panel/books" element={<ManageBooks />} />
            <Route path="/admin-panel/teachers" element={<ManageTeachers />} />
            <Route path="/admin-panel/users" element={<ManageUsers />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
