import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useEffect(() => {
    if (location.state?.scrollTo === "thankyouref" && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <section
      ref={ref}
      className=" w-full min-h-screen p-10 flex items-center justify-center font-Poppins font-bold"
    >
      <div className=" bg-white w-3/4 h-60 flex flex-col p-6 items-center justify-between text-custom-light-purple">
        <p className=" text-3xl">Thank You For Choosing Elite Era</p>
        <div className=" flex flex-col gap-2 items-center">
          <p className=" text-sm font-semibold text-custom-ke7li">
            Your order has been placed and we will contact you soon when your
            payment is processed.
          </p>
          <p className="text-xs font-semibold text-custom-ke7li">
            If you have any questions or concerns, please don't hesitate to
            contact us at{" "}
            <span className=" cursor-pointer text-custom-light-purple font-bold">
              <a href="tel:81674891">+961 81 674 891</a>
            </span>
            .
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className=" w-auto h-9  p-2  font-poppins  text-sm text-white font-normal  bg-custom-light-purple hover:bg-custom-ke7li transition-all delay-100 ease-linear "
        >
          Back to homepage
        </button>
      </div>
    </section>
  );
};

export default ThankYou;
