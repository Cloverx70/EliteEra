import { fetchGetCheckoutByCheckoutId, fetchGetProductById } from "@/api";
import { useStatus } from "@/contexts/statusContext";
import { Iproduct } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoMdClose } from "react-icons/io";
import { MdOutlineSupportAgent } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { object } from "zod";

const OrderHistoryComponentPage = () => {
  const {} = useStatus();

  const { checkoutid } = useParams<{
    checkoutid: string;
  }>();

  const { data: checkoutData } = useQuery({
    queryKey: ["usercheckout"],
    queryFn: () => fetchGetCheckoutByCheckoutId(parseInt(checkoutid!)),
  });

  function formatDate(dateString: Date) {
    const date = new Date(dateString);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const month = monthNames[date.getMonth()];
    const day = date.getDay();
    let hours = date.getHours();
    const year = date.getFullYear();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const dayname = daysOfWeek[day];
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    return {
      month: month,
      day: day,
      hours: hours,
      year: year,
      minutes: minutes,
      dayname: dayname,
      ampm: ampm,
    };
  }
  const navigate = useNavigate();

  const date = formatDate(checkoutData?.createdAt!);
  let prodid = [];

  const [ProdPics, SetProdPics] = useState<string[]>([]);
  useEffect(() => {
    const fetchProductPictures = async () => {
      const prodid = Object.values(checkoutData?.productIds!);

      const newProdPics = await Promise.all(
        prodid.map(async (element: number) => {
          const product = await fetchGetProductById(element);
          return product?.productPicture;
        })
      );

      // Filter out undefined values and update state
      SetProdPics(newProdPics.filter((pic) => pic !== undefined));
    };

    fetchProductPictures();
  }, [checkoutData]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "linear" }}
      exit={{ opacity: 0 }}
      className=" w-full h-auto min-h-screen py-4 bg-custom-dark-white flex flex-col gap-5 text-custom-ke7li font-Poppins"
    >
      <div
        onClick={() => window.history.back()}
        className=" w-auto h-auto p-3 flex items-center justify-start"
      >
        <IoIosArrowBack
          size={30}
          className="cursor-pointer text-custom-light-purple hover:text-custom-ke7li transition-all delay-100 ease-linear"
        />
        <p>Go back...</p>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, ease: "linear" }}
        exit={{ opacity: 0 }}
        className=" flex flex-col gap-3 bg-white  p-6"
      >
        <p className="  text-sm">
          {checkoutData?.orderStatus === "in progress"
            ? "Placed on"
            : checkoutData?.orderStatus === "completed"
            ? "Completed"
            : "Cancelled"}{" "}
          on {date?.dayname}, {date?.month} {date?.day}, {date?.year}
        </p>
        <p className=" text-3xl font-semibold  text-black">
          {date.hours + ":" + date.minutes + " " + date.ampm}
        </p>
        <p
          className={` text-sm ${
            checkoutData?.orderStatus === "cancelled"
              ? "text-red-800 font-bold"
              : " text-custom-ke7li "
          }`}
        >
          {checkoutData?.orderStatus === "cancelled"
            ? "Cancelled"
            : checkoutData?.paymentStatus === "unpaid" ||
              checkoutData?.orderStatus === "in progress"
            ? "Awaiting payment..."
            : checkoutData?.deliveryStatus ===
                "order getting ready for delivery" ||
              checkoutData?.orderStatus === "in progress"
            ? "Your Order getting ready for delivery..."
            : checkoutData?.deliveryStatus === "order picked up" ||
              checkoutData?.orderStatus === "in progress"
            ? "Order picked up..."
            : "Delivered"}
        </p>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: "linear" }}
          exit={{ opacity: 0 }}
          className=" flex gap-2 w-full h-1"
        >
          <div
            className={`w-1/4 h-full rounded-sm ${
              checkoutData?.deliveryStatus === "products in store" &&
              checkoutData?.orderStatus === "in progress"
                ? "bg-custom-light-purple"
                : checkoutData?.orderStatus === "cancelled"
                ? " bg-red-800"
                : ""
            }`}
          />
          <div
            className={`w-1/4 h-full rounded-sm ${
              checkoutData?.deliveryStatus ===
                "order getting ready for delivery" &&
              checkoutData.paymentStatus === "paid"
                ? "bg-custom-light-purple"
                : "bg-custom-ke7li"
            }`}
          />
          <div
            className={`w-1/4 h-full rounded-sm ${
              checkoutData?.deliveryStatus === "order picked up" &&
              checkoutData.paymentStatus === "paid"
                ? "bg-custom-light-purple"
                : "bg-custom-ke7li"
            } `}
          />
          <div
            className={` w-1/4 h-full rounded-sm ${
              checkoutData?.deliveryStatus === "delivered" &&
              checkoutData.paymentStatus === "paid"
                ? "bg-custom-light-purple"
                : "bg-custom-ke7li"
            }`}
          />
        </motion.div>
        <div className=" flex flex-col ">
          <p className=" text-sm text-custom-ke7li">Delivery Order</p>
          <p className=" text-lg text-black">
            {checkoutData?.orderStatus === "in progress"
              ? "This order will be delivered soon. Thank You for choosing Elite Era..."
              : checkoutData?.orderStatus === "completed"
              ? "This order was delivered! Thank you for your shopping"
              : "This order was canceled! If it wasn't you, please let us know..."}
          </p>
        </div>
        <div className=" flex flex-col ">
          <p className=" text-sm text-custom-ke7li">Address</p>
          <p className=" text-lg text-black">
            {checkoutData?.orderName} <br /> {checkoutData?.orderAddress}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, ease: "linear" }}
        exit={{ opacity: 0 }}
        className=" bg-white w-full  p-6 flex gap-3 items-center justify-start"
      >
        <button
          onClick={() => navigate("/contactus")}
          className=" w-40 h-11 rounded-xl bg-custom-light-purple flex items-center justify-center gap-2 text-white"
        >
          <MdOutlineSupportAgent size={25} color="white" /> Contact us
        </button>
        <button className=" w-40 h-11 rounded-xl bg-red-800 flex items-center justify-center gap-2 text-white">
          <IoMdClose size={25} color="white" /> Cancel order
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, ease: "linear" }}
        exit={{ opacity: 0 }}
        className=" bg-white p-6"
      >
        <div className=" flex flex-col gap-4">
          <div className=" flex flex-col">
            <p className=" text-sm text-custom-ke7li">Total</p>
            <p className=" text-lg text-black">
              {checkoutData?.productPriceAfterDiscount}.00
              <span className=" text-xs text-black">USD</span>
            </p>
            <p className=" text-sm text-custom-ke7li">
              By{" "}
              {checkoutData?.paymentMethod === "w2w"
                ? "Whish To Whish"
                : checkoutData?.paymentMethod === "visa"
                ? "Visa"
                : "Cash on Delivey"}
            </p>
          </div>
          <hr className="underscore-hr" />
          <div className=" flex items-center justify-start gap-5">
            {ProdPics.map((pic) => (
              <div className="w-12 h-12 flex items-center justify-center">
                <img src={pic} alt="" className=" object-cover object-center" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, ease: "linear" }}
        exit={{ opacity: 0 }}
        className=" flex flex-col bg-white p-6"
      >
        <p className=" text-sm text-custom-ke7li ">Cash On Delivery change</p>
        <p className=" text-lg text-black">{checkoutData?.bringChange}.00 $</p>
      </motion.div>
    </motion.section>
  );
};

export default OrderHistoryComponentPage;
