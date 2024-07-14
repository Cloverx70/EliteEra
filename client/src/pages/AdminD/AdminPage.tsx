import React, { useEffect, useState } from "react";
import AdminNav from "./components/AdminNav";
import OverView from "./components/OverView";
import { useStatus } from "@/contexts/statusContext";
import { useNavigate } from "react-router-dom";
import ProductsScreen from "./components/ProductsScreen";
import OrdersScreen from "./components/OrdersScreen";
import UsersScreen from "./components/UsersScreen";

const AdminPage = () => {
  const { Status, isAdmin } = useStatus();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin) navigate("/");
  }, [Status]);

  const [ScreenState, setScreenState] = useState({
    Overview: true,
    Products: false,
    Orders: false,
    Users: false,
  });

  const [OrderFilter, setOrderFilter] = useState("in progress");

  return (
    <section className="w-full flex min-h-screen h-screen bg-custom-dark-white ">
      <div className=" w-auto h-full">
        <AdminNav setScreenState={setScreenState} ScreenState={ScreenState} />
      </div>
      <div className=" w-full h-full overflow-y-scroll ">
        {" "}
        {ScreenState.Overview && (
          <div className=" w-full  h-full">
            <OverView />
          </div>
        )}
        {ScreenState.Products && (
          <div className=" w-full h-full">
            <ProductsScreen />
          </div>
        )}
        {ScreenState.Orders && (
          <div className=" w-full h-full">
            <div className=" sticky bg-white w-full border-b shadow-md shadow-black/5 flex h-auto gap-3 justify-start items-center p-5 font-Poppins text-sm">
              <button
                onClick={() => setOrderFilter("in progress")}
                className={`${
                  OrderFilter === "in progress"
                    ? "bg-custom-light-purple text-white"
                    : "bg-white"
                } hover:bg-custom-light-purple  rounded-xl hover:text-white transition-all delay-100 ease-linear w-32 h-9 `}
              >
                In Progress
              </button>
              <button
                onClick={() => setOrderFilter("completed")}
                className={`${
                  OrderFilter === "completed"
                    ? "bg-custom-light-purple text-white"
                    : "bg-white"
                } hover:bg-custom-light-purple rounded-xl hover:text-white transition-all delay-100 ease-linear w-32 h-9 `}
              >
                Completed
              </button>
              <button
                onClick={() => setOrderFilter("cancelled")}
                className={`${
                  OrderFilter === "cancelled"
                    ? "bg-custom-light-purple text-white"
                    : "bg-white"
                } hover:bg-custom-light-purple rounded-xl hover:text-white transition-all delay-100 ease-linear w-32 h-9 `}
              >
                Cancelled
              </button>
            </div>
            <OrdersScreen
              OrderFilter={OrderFilter}
              setOrderFilter={setOrderFilter}
            />{" "}
          </div>
        )}
        {ScreenState.Users && <UsersScreen />}
      </div>
    </section>
  );
};

export default AdminPage;
