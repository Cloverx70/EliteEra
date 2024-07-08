import React, { useEffect, useState } from "react";
import OrderTags from "./Components/OrderTags";
import InProgressPage from "./Components/InProgressPage";
import { useQuery } from "@tanstack/react-query";
import {
  fetchGetAllCheckoutsByUserId,
  fetchGetAllUserProducts,
  fetchGetCheckoutByUserProductAndUserId,
} from "@/api";
import { useStatus } from "@/contexts/statusContext";
import { IuserProduct } from "@/interfaces";
import CompletedPage from "./Components/CompletedPage";
import CanceledPage from "./Components/CanceledPage";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";

const OrderHistory = () => {
  const { Status } = useStatus();
  const [btnActive, setBtnActive] = useState({
    inProgress: true,
    completed: false,
    cancelled: false,
  });

  const { data: userCheckouts } = useQuery({
    queryKey: ["usercheckouts"],
    queryFn: () => fetchGetAllCheckoutsByUserId(Status!.userId),
  });

  return (
    <section className=" bg-custom-dark-white font-Poppins">
      <div
        onClick={() => window.history.back()}
        className=" w-auto h-auto p-5 flex items-center justify-start"
      >
        <IoIosArrowBack
          size={30}
          className="cursor-pointer text-custom-light-purple hover:text-custom-ke7li transition-all delay-100 ease-linear"
        />
        <p className=" text-custom-ke7li">Go back...</p>
      </div>
      <div className=" w-full h-auto  min-h-screen flex flex-col   items-center justify-start">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
          className=" w-full h-full  py-5 bg-custom-dark-white "
        >
          <OrderTags btnActive={btnActive} setBtnActive={setBtnActive} />
          {btnActive.inProgress && (
            <InProgressPage userCheckouts={userCheckouts} />
          )}
          {btnActive.completed && (
            <CompletedPage userCheckouts={userCheckouts} />
          )}
          {btnActive.cancelled && (
            <CanceledPage userCheckouts={userCheckouts} />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default OrderHistory;
