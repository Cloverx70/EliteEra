import React, { Component, ReactNode } from "react";
import { string } from "zod";
import { FaDollarSign } from "react-icons/fa";
import { LineChart } from "@mui/x-charts/LineChart";
import { Istatistics } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { fetchGetStat } from "@/api";
import { useStatus } from "@/contexts/statusContext";
import { stat } from "fs";
type TabsCardProps = {
  text: string;
  reacticons: ReactNode;
  value: number;
};

const TabsCard: React.FC<TabsCardProps> = ({ text, reacticons, value }) => {
  return (
    <div className=" w-60 h-auto p-3 rounded-2xl bg-custom-dark-ke7li gap-2 flex items-center justify-start">
      <div className="text-4xl text-white">{reacticons}</div>
      <div className=" flex flex-col ">
        <p className=" font-Poppins text-xl font-normal text-white">{text}</p>
        <p className=" font-Poppins font-semibold text-xl text-white ">
          {value}
        </p>
      </div>
    </div>
  );
};

const GraphCard: React.FC = ({}) => {
  return (
    <div>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            color: "white",
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
};

const OverView = () => {
  const { Status } = useStatus();
  const { data: statData } = useQuery({
    queryKey: ["stats"],
    queryFn: () => fetchGetStat(Status!),
  });

  return (
    <section className=" w-full max-h-screen flex items-start justify-start p-5 gap-5">
      <TabsCard
        text="TOTAL EARNINGS"
        reacticons={<FaDollarSign />}
        value={statData?.totalEarnings!}
      />
      <TabsCard
        text="TOTAL USERS"
        reacticons={<FaDollarSign />}
        value={statData?.totalUsers!}
      />
      <TabsCard
        text="TOTAL PRODUCTS"
        reacticons={<FaDollarSign />}
        value={statData?.totalProducts!}
      />
      <div>
        <GraphCard />
      </div>
    </section>
  );
};

export default OverView;
