// for /dashboard-coupouns
import React from "react";
import DashboardLayout from "../../components/Shop/Layout/DashboardLayout";
import AllCoupons from "../../components/Shop/AllCoupons";

const ShopAllCoupons = () => {
  return (
    <DashboardLayout active={9}>
      <AllCoupons />
    </DashboardLayout>
  );
};

export default ShopAllCoupons;