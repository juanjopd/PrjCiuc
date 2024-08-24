import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const SidebarContainer = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />;
};
