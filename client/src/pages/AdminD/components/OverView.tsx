import { fetchGetAlltStats, fetchGetLatestStats } from "@/api";
import { useStatus } from "@/contexts/statusContext";
import { Istatistics } from "@/interfaces";
import { LineChart } from "@mui/x-charts/LineChart";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

type StatsCardProps = {
  CardName: string;
  UnitOrValue: string;
};

const OverView = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stats"],
    queryFn: () => fetchGetAlltStats(),
  });

  const {
    data: latestStats,
    isLoading: latestLoading,
    error: latestError,
  } = useQuery({
    queryKey: ["lateststats"],
    queryFn: () => fetchGetLatestStats(),
  });

  const [Stats, setStats] = useState<{
    totalEarnings: number[];
    totalPurchases: number[];
    totalUsers: number[];
    totalProducts: number[];
    totalOrders: number[];
  }>({
    totalEarnings: [],
    totalPurchases: [],
    totalUsers: [],
    totalProducts: [],
    totalOrders: [],
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const aggregatedStats = {
        totalEarnings: [0] as number[],
        totalPurchases: [0] as number[],
        totalUsers: [0] as number[],
        totalProducts: [0] as number[],
        totalOrders: [0] as number[],
      };

      data.forEach((element: Istatistics) => {
        aggregatedStats.totalEarnings.push(element.totalEarnings);
        aggregatedStats.totalPurchases.push(element.totalPurchases);
        aggregatedStats.totalUsers.push(element.totalUsers);
        aggregatedStats.totalProducts.push(element.totalProducts);
        aggregatedStats.totalOrders.push(element.totalOrders);
      });
      console.log(latestStats);
      setStats(aggregatedStats);
    }
  }, [data]);

  if (isLoading || latestLoading) return <div>Loading...</div>;
  if (error || latestError) return <div>Error loading data</div>;

  return (
    <section className="w-full h-full bg-custom-dark-white">
      <div className="w-full h-auto p-5 grid grid-cols-5">
        <StatsCard
          CardName="Total Earnings"
          UnitOrValue={`$ ${latestStats![0].totalEarnings}`}
        />
        <StatsCard
          CardName="Total Purchases"
          UnitOrValue={`$ ${latestStats![0].totalPurchases}`}
        />
        <StatsCard
          CardName="Total Users"
          UnitOrValue={`${latestStats![0].totalUsers}`}
        />
        <StatsCard
          CardName="Total Products"
          UnitOrValue={`${latestStats![0].totalProducts}`}
        />
        <StatsCard
          CardName="Total Orders"
          UnitOrValue={`${latestStats![0].totalOrders}`}
        />
      </div>
      <div className="grid grid-cols-2 gap-5 p-5 font-Poppins">
        <div className="flex flex-col  bg-white p-3 justify-center items-center">
          <p>Total Users</p>
          <StatGraph data={Stats.totalUsers} />
        </div>
        <div className="flex flex-col bg-white  p-3 justify-center items-center">
          <p>Total Products</p>
          <StatGraph data={Stats.totalProducts} />
        </div>
      </div>
    </section>
  );
};

const StatsCard = ({ CardName, UnitOrValue }: StatsCardProps) => {
  return (
    <section className="w-52 flex items-center justify-start h-20 font-Poppins bg-custom-light-purple text-white">
      <div className="p-4 flex flex-col items-start justify-center">
        <p className="text-xl font-semibold">{CardName}</p>
        <p className="text-lg">{UnitOrValue}</p>
      </div>
    </section>
  );
};

type StateGraphProps = {
  data: number[];
};

const StatGraph = ({ data }: StateGraphProps) => {
  return (
    <section>
      <LineChart
        xAxis={[
          {
            data: [
              0, 1, 2, 3, 8, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120,
              140, 150, 200,
            ],
          },
        ]}
        series={[
          {
            data: data,
            color: "#676eff",
          },
        ]}
        width={500}
        height={300}
      />
    </section>
  );
};

export default OverView;
