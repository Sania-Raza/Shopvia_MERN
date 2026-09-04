import React, { useEffect } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../../redux/actions/order";
import { getAllProductsShop } from "../../../redux/actions/product";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (!seller?._id) return;

    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller?._id]);

  const availableBalance = seller?.availableBalance.toFixed(2);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.row.status === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/dashboard/order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "PKR " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full p-4 md:p-8">
      <h3 className="text-[20px] md:text-[22px] font-semibold text-[#1E1B4B] pb-4">
        Overview
      </h3>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        <div className="min-h-[18vh] bg-white border border-[#f0ece3] rounded-2xl px-4 py-4 md:py-5">
          <div className="flex items-center gap-2">
            <AiOutlineMoneyCollect
              size={22}
              className="text-[#C9A227] shrink-0"
            />
            <h3 className="text-[13px] md:text-[15px] font-medium text-gray-500 leading-tight">
              Account Balance
            </h3>
          </div>
          <h5 className="pt-3 text-[17px] md:text-[20px] font-semibold text-[#1E1B4B]">
            PKR {availableBalance}
          </h5>
        </div>

        <div className="min-h-[18vh] bg-white border border-[#f0ece3] rounded-2xl px-4 py-4 md:py-5">
          <div className="flex items-center gap-2">
            <MdBorderClear size={22} className="text-[#C9A227] shrink-0" />
            <h3 className="text-[13px] md:text-[15px] font-medium text-gray-500 leading-tight">
              All Orders
            </h3>
          </div>
          <h5 className="pt-3 text-[17px] md:text-[20px] font-semibold text-[#1E1B4B]">
            {orders && orders.length}
          </h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-2 text-[13px] font-medium text-[#C9A227]">
              View Orders
            </h5>
          </Link>
        </div>

        <div className="col-span-2 md:col-span-1 min-h-[18vh] bg-white border border-[#f0ece3] rounded-2xl px-4 py-4 md:py-5">
          <div className="flex items-center gap-2">
            <AiOutlineMoneyCollect
              size={22}
              className="text-[#C9A227] shrink-0"
            />
            <h3 className="text-[13px] md:text-[15px] font-medium text-gray-500 leading-tight">
              All Products
            </h3>
          </div>
          <h5 className="pt-3 text-[17px] md:text-[20px] font-semibold text-[#1E1B4B]">
            {products && products.length}
          </h5>
          <Link to="/dashboard-products">
            <h5 className="pt-2 text-[13px] font-medium text-[#C9A227]">
              View Products
            </h5>
          </Link>
        </div>
      </div>

      <h3 className="text-[20px] md:text-[22px] font-semibold text-[#1E1B4B] pt-8 pb-4">
        Latest Orders
      </h3>
      <div className="w-full min-h-[45vh] bg-white rounded-2xl border border-[#f0ece3] overflow-hidden">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default DashboardHero;
