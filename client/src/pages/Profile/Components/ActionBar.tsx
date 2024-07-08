import React from "react";
import { useNavigate } from "react-router-dom";

const ActionBar = () => {
  const navigate = useNavigate();
  return (
    <section className=" w-full h-auto px-10 pb-10 text-white font-Poppins  font-semibold">
      <div className=" w-full h-full flex bg-white p-5 gap-5 ">
        <button
          className=" w-40 h-11  bg-custom-light-purple hover:bg-transparent hover:text-custom-light-purple hover:border-custom-light-purple hover:border-2 transition-colors ease-linear delay-100"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </button>
        <button
          onClick={() => navigate("/contactus")}
          className=" w-40 h-11 bg-custom-light-purple hover:bg-transparent hover:text-custom-light-purple hover:border-custom-light-purple hover:border-2 transition-colors ease-linear delay-100"
        >
          Contact us
        </button>
        <button className=" w-40 h-11 bg-red-800 hover:bg-transparent hover:text-red-800 hover:border-red-800 hover:border-2 transition-colors ease-linear delay-100 ">
          Close Account
        </button>
      </div>
    </section>
  );
};

export default ActionBar;
