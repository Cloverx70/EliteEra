import React from "react";
import HeroSection from "./components/HeroSection";
import Categories from "./components/Categories";
import Featured from "./components/Featured";
import Newsletter from "./components/Newsletter";
import Footer from "../../shared/Footer";
import { useStatus } from "@/contexts/statusContext";
import HeroSetionSkeleton from "./Skeletons/HeroSetionSkeleton";
const HomePage = () => {
  const { statusLoading } = useStatus();

  if (statusLoading) return <HeroSetionSkeleton />;

  return (
    <section className="overflow-x-hidden">
      <HeroSection />
      <Categories />
      <Featured />
      <Newsletter />
    </section>
  );
};

export default HomePage;
