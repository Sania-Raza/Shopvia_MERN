import React from "react";
import DashboardLayout from "../../components/Shop/Layout/DashboardLayout";
import DashboardHero from "../../components/Shop/DashboardHero";

const ShopDashboardPage = () => {
  return (
    <DashboardLayout active={1}>
      <DashboardHero />
    </DashboardLayout>
  );
};

export default ShopDashboardPage;
