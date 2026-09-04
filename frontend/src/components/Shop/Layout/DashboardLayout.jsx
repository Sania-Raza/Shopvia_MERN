// components/Shop/Layout/DashboardLayout.jsx
import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSideBar from "./DashboardSideBar";

const DashboardLayout = ({ active, children }) => {
  return (
    <div className="w-full overflow-x-hidden">
      <DashboardHeader />

      <div className="flex items-start w-full">
        <div className="w-17.5 md:w-62.5 shrink-0">
          <DashboardSideBar active={active} />
        </div>

        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
