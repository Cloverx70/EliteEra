import { fetchGetProductById } from "@/api";
import { IUserCheckout, Iproduct } from "@/interfaces";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IoClipboardSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type InProgressPageProps = {
  userCheckouts: IUserCheckout[];
};

type CheckoutCardProps = {
  InProgressUserCheckouts: IUserCheckout[];
};

const CompletedPage = ({ userCheckouts = [] }: InProgressPageProps) => {
  const [InProgressUserCheckouts, setInProgressUserCheckouts] = useState<
    IUserCheckout[]
  >([]);

  useEffect(() => {
    const inProgressCheckouts = userCheckouts.filter(
      (element: IUserCheckout) => element.orderStatus === "completed"
    );
    setInProgressUserCheckouts(inProgressCheckouts);
  }, [userCheckouts]);

  return (
    <div className="h-full w-full">
      {InProgressUserCheckouts.length === 0 ? (
        <div className="flex flex-col pt-40 gap-5 w-full items-center justify-center h-full">
          <IoClipboardSharp
            size={100}
            className=" text-custom-light-purple rotate-45"
          />
          <p className="text-lg  text-custom-ke7li">
            You Have No Completed Orders
          </p>
        </div>
      ) : (
        <CheckoutCards InProgressUserCheckouts={InProgressUserCheckouts} />
      )}
    </div>
  );
};

const CheckoutCards = ({ InProgressUserCheckouts }: CheckoutCardProps) => {
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

    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${month} ${day} at ${hours}:${minutes} ${ampm}`;
  }

  const [ProductPicsMap, setProductPicsMap] = useState<{
    [key: number]: string[];
  }>({});

  useEffect(() => {
    // Fetch product pictures when InProgressUserCheckouts changes
    const fetchProductPictures = async () => {
      const picturesMap: { [key: number]: string[] } = {};

      await Promise.all(
        InProgressUserCheckouts.map(
          async (checkout: IUserCheckout, index: number) => {
            const productIds = Object.values(checkout.productIds);

            const fetchPromises = productIds.map((productId: number) =>
              fetchGetProductById(productId).then(
                (res: Iproduct) => res.productPicture
              )
            );

            const pictures = await Promise.all(fetchPromises);
            picturesMap[index] = pictures;
          }
        )
      );

      setProductPicsMap(picturesMap);
    };

    fetchProductPictures();
  }, [InProgressUserCheckouts]);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full h-screen  items-start gap-5 justify-start overflow-y-scroll p-10 font-Poppins">
      {InProgressUserCheckouts.map((checkout: IUserCheckout, index: number) => (
        <motion.div
          key={checkout.checkoutId}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 0.98 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={() => navigate(`/orderhistory/${checkout.checkoutId}`)}
          className="w-full h-auto cursor-pointer rounded-2xl p-5 bg-white flex flex-col gap-4"
        >
          <div className="flex justify-between p-5">
            <div className="flex flex-col">
              <p className="text-xl font-bold">
                {formatDate(checkout?.createdAt)}
              </p>
              <p className="text-sm text-custom-ke7li">
                Order #{checkout.checkoutId} - Delivery
              </p>
              <p className=" text-sm text-custom-ke7li">
                Total is{" "}
                <span className=" text-custom-light-purple">
                  {checkout.productPriceAfterDiscount}$
                </span>
              </p>

              <p className="text-xs font-bold text-custom-ke7li uppercase">
                {checkout.paymentStatus}
              </p>
            </div>
            <div>
              <p className="text-sm text-custom-ke7li">
                {checkout.orderStatus === "completed" && "Completed"}
              </p>
            </div>
          </div>
          <hr className="underscore-hr" />
          <div className="flex justify-start items-center w-full h-20">
            {ProductPicsMap[index]?.map((picture: string, picIndex: number) => (
              <img
                key={picIndex}
                src={picture}
                alt={`Product ${picIndex + 1}`}
                className="object-cover w-20 h-20 rounded-2xl"
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CompletedPage;
