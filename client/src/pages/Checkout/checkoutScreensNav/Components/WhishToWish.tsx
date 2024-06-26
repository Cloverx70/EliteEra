import { fetchGetCheckoutByCheckoutId } from "@/api";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, forwardRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type whishtowhishProps = {
  checkoutid: number;
};

const WhishToWish = forwardRef<HTMLDivElement, whishtowhishProps>(
  ({ checkoutid }, ref) => {
    const { data: checkoutObj } = useQuery({
      queryKey: ["usercheckout"],
      queryFn: () => fetchGetCheckoutByCheckoutId(checkoutid),
    });

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      if (
        location.state?.scrollTo === "whishtowhishref" &&
        ref &&
        "current" in ref &&
        ref.current
      ) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [location, ref]);

    return (
      <section
        ref={ref}
        className=" w-full min-h-screen flex items-center justify-center font-Poppins text-sm font-normal text-white py-10 px-10"
      >
        <div className=" w-full h-full flex flex-col gap-20">
          <p className=" font-bold  text-4xl text-white ">
            You Chose To Pay With
            <span className=" text-custom-light-purple"> Whish To Whish </span>
          </p>
          <div className=" bg-white p-4 w-full">
            <p className=" text-xl font-semibold text-custom-light-purple">
              Whish To Whish Code : {checkoutObj?.wishOrderCode}
            </p>
            <p className=" text-xs text-custom-ke7li">
              DISCLAIMER : DO NOT SHARE THIS CODE WITH ANYONE OR IT'LL RESULT
              WITH
              <br />
              NOT RECEIVING YOUR ORDER!!
            </p>
          </div>{" "}
          <div className=" w-full   h-[400px] flex items-center justify-around">
            <div className="w-1/4  h-full flex flex-col items-start justify-start gap-4">
              <p className=" font-semibold text-custom-light-purple">
                1. Open Whish App
              </p>
              <p>
                Download Whish from the{" "}
                <span className=" text-custom-light-purple">Playstore</span> or
                <span className=" text-custom-light-purple">
                  {" "}
                  Appstore{" "}
                </span>{" "}
                then open the whish app on your phone and click on Pay.
              </p>
            </div>
            <div className="w-1/4 h-full  flex flex-col items-start justify-start gap-4">
              <p className=" font-semibold text-custom-light-purple">
                2. Choose Paying With Wish To Whish
              </p>
              <p>
                After opening your whish app, navigate to the paying section and
                choose pay through{" "}
                <span className=" text-custom-light-purple">Wish To Whish</span>
                .
              </p>
            </div>
            <div className="w-1/4 h-full flex flex-col items-start justify-start gap-4">
              <p className=" font-semibold text-custom-light-purple">
                3. Complete Payment
              </p>
              <div className=" flex flex-col gap-6 w-full h-full">
                <p>
                  After navigating to paying with Whish To Whish, please fill
                  the following fields as below: <br />
                  <br />1 . {""}
                  <span className=" text-custom-light-purple">
                    Receiver's Phone Number
                  </span>{" "}
                  : +961 81674891 <br />
                  <br />2 .{" "}
                  <span className=" text-custom-light-purple">
                    Amount to be paid{" "}
                  </span>
                  : ${checkoutObj?.productPriceAfterDiscount}
                  <br />
                  <br />3 .{" "}
                  <span className=" text-custom-light-purple">
                    {" "}
                    Notes{" "}
                  </span> : {checkoutObj?.wishOrderCode}
                  <br />
                  <br />
                  After making sure thta the fields are correct click on pay
                  now!
                </p>
                <p>
                  <span className=" text-custom-light-purple"> IMPORTANT </span>
                  : DO NOT PAY UNLESS THE YOU CHECK THAT THE CODE YOU ENTERED IN
                  THE NOTES FIELD IS CORRECT OTHERWISE YOUR PAYMENT WILL NOT BE
                  TAKEN INTO CONSIDERATION, AND YOU WILL NOT RECEIVE YOUR
                  PRODUCTS.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white p-4  flex items-center justify-between gap-2">
            <p className=" text-xs text-custom-ke7li">
              DON'T PRESS THE PAY BUTTON UNLESS YOU CHECK THAT THE CODE YOU
              ENTERED IN THE NOTES FIELD IS CORRECT{" "}
              <span className=" text-custom-light-purple">
                {" "}
                (DO NOT EXIT THIS PAGE BEFORE THE PAYMENT IS DONE!!){" "}
              </span>
            </p>
            <button
              onClick={() =>
                navigate("/thankyou", { state: { scrollTo: "thankyouref" } })
              }
              className=" w-32 h-9  font-poppins font-bold text-sm  bg-custom-light-purple hover:bg-custom-ke7li transition-all delay-100 ease-linear "
            >
              I Payed
            </button>
          </div>
        </div>
      </section>
    );
  }
);

export default WhishToWish;
