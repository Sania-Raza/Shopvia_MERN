// for /dashboard-events
import React from "react";
import DashboardLayout from "../../components/Shop/Layout/DashboardLayout";
import AllEvents from "../../components/Shop/AllEvents";

const ShopAllEvents = () => {
  return (
    <DashboardLayout active={5}>
      <AllEvents />
    </DashboardLayout>
  );
};

export default ShopAllEvents;
