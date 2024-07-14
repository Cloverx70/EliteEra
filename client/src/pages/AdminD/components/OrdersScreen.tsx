import { fetchGetAllCheckouts } from "@/api";
import { Icheckout, IUserCheckout } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";

type OrderScreenProps = {
  setOrderFilter: React.Dispatch<React.SetStateAction<string>>;
  OrderFilter: string;
};

const OrdersScreen = ({ OrderFilter, setOrderFilter }: OrderScreenProps) => {
  const { data: checkouts } = useQuery({
    queryKey: ["checkouts"],
    queryFn: fetchGetAllCheckouts,
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

    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${month} ${day} at ${hours}:${minutes} ${ampm}`;
  }

  const navigate = useNavigate();

  return (
    <section className="w-full h-full bg-custom-dark-white font-Poppins overflow-y-scroll">
      <div className="flex flex-col p-5 gap-5  overflow-y-scroll h-auto ">
        {checkouts
          ?.filter((item: IUserCheckout) => item.orderStatus === OrderFilter)
          .map((checkout: IUserCheckout) => (
            <div
              key={checkout.wishOrderCode}
              className="flex flex-col bg-white shadow-md rounded-sm p-4 font-Poppins justify-start items-start"
            >
              <div
                onClick={() => navigate(`/orderhistory/${checkout.checkoutId}`)}
                className="w-full h-auto cursor-pointer  rounded-2xl p-5 bg-white flex flex-col gap-4"
              >
                <div className="flex justify-between p-5">
                  <div className="flex flex-col">
                    <p className="text-xl font-bold">
                      {formatDate(checkout?.createdAt)}
                    </p>
                    <p className="text-sm text-custom-ke7li">
                      Order #{checkout.checkoutId} - {checkout.userFullName} -
                      Delivery
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
                      {checkout.orderStatus === "in progress" && "In Progress"}
                    </p>
                  </div>
                </div>
                <hr className="underscore-hr" />
                <div className="flex justify-start items-center w-full gap-2 h-20">
                  {Object.values(checkout.productImages).map(
                    (picture, picIndex) => (
                      <img
                        key={picIndex}
                        src={picture}
                        alt={`Product ${picIndex + 1}`}
                        className="object-cover w-20 h-20 rounded-2xl"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          ))}{" "}
      </div>
    </section>
  );
};

export default OrdersScreen;
