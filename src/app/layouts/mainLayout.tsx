import React from "react";
import { Outlet } from "react-router";

const MainLayout: React.FC = () => (
  <>
    <Outlet />
  </>
);

export default MainLayout;
