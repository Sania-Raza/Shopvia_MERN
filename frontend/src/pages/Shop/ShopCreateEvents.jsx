// for /dashboard-create-event
import React from "react";
import DashboardLayout from "../../components/Shop/Layout/DashboardLayout";
import CreateEvent from "../../components/Shop/CreateEvent";

const ShopCreateEvent = () => {
  return (
    <DashboardLayout active={6}>
      <CreateEvent />
    </DashboardLayout>
  );
};

export default ShopCreateEvent;
