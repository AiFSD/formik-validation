import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AuthorBoard from "./components/AuthorBoard";
import BookBoard from "./components/BookBoard";
import "./App.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/author",
      element: <AuthorBoard />,
    },
    {
      path: "/books",
      element: <BookBoard />,
    },
  ]);
  return (
    <div className="con">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
