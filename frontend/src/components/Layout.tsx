import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./Home";
import AddEmployee from "./AddEmploee";
import Header from "./Header";
// import Modal from "./Modal";

const Layout: React.FC = () => {
  const AppLayout = () => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  };
  const route = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/add_employee",
          element: <AddEmployee />,
        },
        {
          path: "/edit_employee/:id",
          element: <AddEmployee />,
        },
      ],
    },
  ]);

  return <RouterProvider router={route}></RouterProvider>;
  // return <Modal />;
};

export default Layout;
