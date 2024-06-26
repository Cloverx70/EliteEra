import React from "react";

const AdminNav = () => {
  return (
    <section className=" w-full h-20 flex items-center justify-start pl-5 pb-5 border-b border-custom-ke7li">
      <ul className=" flex  gap-10 items-center justify-start pt-7 font-Poppins text-white font-light text-sm">
        <li>Overview</li>
        <li>Users</li>
        <li>Products</li>
      </ul>
    </section>
  );
};

export default AdminNav;
