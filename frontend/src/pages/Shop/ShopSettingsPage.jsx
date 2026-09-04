import React from "react";
import ShopSettings from "../../components/Shop/ShopSettings";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";

const ShopSettingsPage = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <DashboardHeader />
      <div className="flex items-start w-full">
        <div className="w-17.5 md:w-62.5 shrink-0">
          <DashboardSideBar active={11} />
        </div>
        <div className="flex-1 min-w-0">
          <ShopSettings />
        </div>
      </div>
    </div>
  );
};

export default ShopSettingsPage;
