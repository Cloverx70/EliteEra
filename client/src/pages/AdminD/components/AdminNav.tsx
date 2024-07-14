import React from "react";
import { FaList } from "react-icons/fa6";
import { MdAutoGraph } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi2";
import { FaUsersCog } from "react-icons/fa";

type AdminNavProps = {
  setScreenState: React.Dispatch<
    React.SetStateAction<{
      Overview: boolean;
      Products: boolean;
      Orders: boolean;
      Users: boolean;
    }>
  >;
  ScreenState: {
    Overview: boolean;
    Products: boolean;
    Orders: boolean;
    Users: boolean;
  };
};
const AdminNav = ({ setScreenState, ScreenState }: AdminNavProps) => {
  return (
    <section className=" w-44 h-full   flex items-start justify-center p-10 bg-white border-r border-custom-ke7li/15 ">
      <div className=" flex flex-col items-center justify-center gap-4 font-Poppins  text-black font-semibold text-sm">
        <div
          onClick={() =>
            setScreenState({
              Overview: true,
              Products: false,
              Orders: false,
              Users: false,
            })
          }
          className={`${
            ScreenState.Overview ? " text-custom-light-purple" : ""
          } w-32 p-3 flex items-center cursor-pointer hover:text-custom-light-purple transition-all delay-100 ease-linear justify-start gap-2`}
        >
          <MdAutoGraph size={20} /> <p>Overview</p>
        </div>
        <div
          onClick={() =>
            setScreenState({
              Overview: false,
              Products: true,
              Orders: false,
              Users: false,
            })
          }
          className={`${
            ScreenState.Products ? " text-custom-light-purple" : ""
          } w-32 p-3 flex items-center cursor-pointer hover:text-custom-light-purple transition-all delay-100 ease-linear justify-start gap-2`}
        >
          <FaList size={15} /> <p>Products</p>
        </div>
        <div
          onClick={() =>
            setScreenState({
              Overview: false,
              Products: false,
              Orders: true,
              Users: false,
            })
          }
          className={`${
            ScreenState.Orders ? " text-custom-light-purple" : ""
          } w-32 p-3 flex items-center cursor-pointer hover:text-custom-light-purple transition-all delay-100 ease-linear justify-start gap-2`}
        >
          <HiShoppingBag size={20} />
          <p>Orders</p>
        </div>
        <div
          onClick={() =>
            setScreenState({
              Overview: false,
              Products: false,
              Orders: false,
              Users: true,
            })
          }
          className={`${
            ScreenState.Users ? "text-custom-light-purple" : ""
          } w-32 p-3 flex items-center cursor-pointer hover:text-custom-light-purple transition-all delay-100 ease-linear justify-start gap-2`}
        >
          <FaUsersCog size={20} />
          <p>Users</p>
        </div>
      </div>
    </section>
  );
};

export default AdminNav;
