import React, { useEffect } from "react";
import AdminNav from "./components/AdminNav";
import OverView from "./components/OverView";
import { useStatus } from "@/contexts/statusContext";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const { Status } = useStatus();
  const navigate = useNavigate();
  useEffect(() => {
    if (Status?.isAdmin !== true) navigate("/");
  }, [Status]);

  return (
    <section className="w-full h-screen">
      <AdminNav />
      <OverView />
    </section>
  );
};

export default AdminPage;
