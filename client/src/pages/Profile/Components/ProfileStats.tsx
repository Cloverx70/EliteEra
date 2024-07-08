import React from "react";
import { useNavigate } from "react-router-dom";
import { ImStatsBars } from "react-icons/im";
import { useStatus } from "@/contexts/statusContext";
type StatCardsProps = {
  CardName: string;
  CardValue: string;
};

const ProfileStats = () => {
  const { Status } = useStatus();
  const navigate = useNavigate();
  return (
    <section className=" pb-10 px-10 w-full h-auto ">
      <div className=" w-full h-full flex flex-col gap-10 bg-white p-10">
        <div className=" flex items-center gap-3 justify-start">
          <ImStatsBars size={25} className=" text-custom-light-purple" />
          <p className=" font-Poppins text-xl  text-custom-ke7li ">
            Your Stats
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <StatCards
            CardName="Total Spendings"
            CardValue={`$ ${Status?.totalSpendings}`}
          />
          <StatCards
            CardName="Ongoing Orders"
            CardValue={`${Status?.ongoingOrders}`}
          />
          <StatCards
            CardName="Completed Orders"
            CardValue={`${Status?.completedOrders}`}
          />
          <StatCards
            CardName="Canceled Orders"
            CardValue={`${Status?.cancelledOrders}`}
          />
        </div>
        <div className=" flex items-center justify-center">
          <p
            onClick={() => navigate("/orderhistory")}
            className=" text-sm text-custom-ke7li underline hover:text-custom-light-purple cursor-pointer transition-all delay-100 ease-linear"
          >
            Review order history?
          </p>
        </div>
      </div>
    </section>
  );
};

const StatCards = ({ CardName, CardValue }: StatCardsProps) => {
  return (
    <div className="w-full bg-custom-light-purple text-white p-4 font-Poppins ">
      <p className=" font-semibold text-xl">{CardName}</p>
      <p className=" font-medium text-lg">{CardValue}</p>
    </div>
  );
};

export default ProfileStats;
