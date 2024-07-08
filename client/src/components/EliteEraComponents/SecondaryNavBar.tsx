import React from "react";
import { MdHistory } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { FaCircleUser, FaTruckFast } from "react-icons/fa6";
import { useStatus } from "@/contexts/statusContext";
import { MdAdminPanelSettings } from "react-icons/md";
import { UserData } from "@/interfaces";
import { useNavigate } from "react-router-dom";
import { SheetTrigger } from "@/components/ui/sheet";

type NavigationCardProps = {
  Status: UserData;
  isAdmin: boolean;
};
const NavigationCards = ({ Status, isAdmin }: NavigationCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={`${
        isAdmin ? "w-full" : "w-full"
      } h-1/2  flex justify-between items-center font-Poppins`}
    >
      <SheetTrigger
        className={`${
          isAdmin ? "w-full" : "w-full"
        } h-full flex  justify-center items-center font-Poppins`}
      >
        <div
          onClick={() => navigate(`/orderhistory`)}
          className=" w-[25%] h-full gap-2 bg-custom-light-purple hover:bg-custom-ke7li transition-all delay-100 ease-linear cursor-pointer flex justify-center items-center"
        >
          <MdHistory size={25} />
          <p className=" text-sm">Order History</p>
        </div>
        <div
          onClick={() => navigate(`/profile`)}
          className=" w-[25%] h-full gap-2 bg-custom-light-purple hover:bg-custom-ke7li transition-all delay-100 ease-linear cursor-pointer   flex justify-center items-center"
        >
          <MdManageAccounts size={25} />
          <p className=" text-sm">Account Management</p>
        </div>
        <div
          className={`${
            !isAdmin ? "hidden" : ""
          } w-[25%] h-full gap-2 bg-custom-light-purple  hover:bg-custom-ke7li transition-all delay-100 ease-linear cursor-pointer  flex justify-center items-center`}
        >
          <MdAdminPanelSettings size={25} />
          <p className=" text-sm">Admin Dashboard</p>
        </div>
      </SheetTrigger>
    </div>
  );
};

const SecondaryNavBar = () => {
  const { Status, isAdmin } = useStatus();
  return (
    <section className=" w-full h-full flex flex-col items-center justify-between font-Poppins text-white">
      <div className={`${"w-3/4"} h-1/2  flex items-center justify-between`}>
        <div className=" w-1/4 h-full  flex justify-start items-center gap-3 ">
          {Status?.userpfp === "" ? (
            <FaCircleUser
              size={30}
              className="text-custom-dark-ke7li cursor-pointer bg-custom-ke7li rounded-full ring-1 ring-custom-light-purple"
            />
          ) : (
            <img
              src={Status?.userpfp}
              alt="pfp"
              className="w-10 h-10 p-1 cursor-pointer rounded-full ring-1 ring-custom-light-purple"
            />
          )}

          <div className=" flex flex-col justify-center items-start text-sm">
            <p className=" font-bold">{Status?.username}</p>
            <p className=" text-xs text-custom-ke7li">
              {isAdmin ? "Admin" : "Customer"}
            </p>
          </div>
        </div>
        <div className=" w-1/4 h-full text-sm font-Poppins flex flex-col justify-end items-end">
          <p className=" font-bold"> Elite Currency 9$ </p>
          <p className=" text-custom-ke7li text-xs">United States $</p>
        </div>
      </div>
      <div
        className={` ${
          isAdmin ? "w-full" : "w-3/4"
        }  h-full flex items-center justify-center`}
      >
        <NavigationCards Status={Status!} isAdmin={isAdmin} />
      </div>
    </section>
  );
};

export default SecondaryNavBar;
