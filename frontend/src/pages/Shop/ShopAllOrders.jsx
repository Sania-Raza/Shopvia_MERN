// for /dashboard-orders
import React from "react";
import DashboardLayout from "../../components/Shop/Layout/DashboardLayout";
import AllOrders from "../../components/Shop/AllOrders";

const ShopAllOrders = () => {
  return (
    <DashboardLayout active={2}>
      <AllOrders />
    </DashboardLayout>
  );
};

export default ShopAllOrders;
