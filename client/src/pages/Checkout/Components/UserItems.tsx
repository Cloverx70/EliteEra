import { fetchGetAllUserProducts, fetchGetUserCartByUserId } from "@/api";
import { useStatus } from "@/contexts/statusContext";
import { Icart, IuserProduct, UserData } from "@/interfaces";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CheckoutBar from "./CheckoutBar";
import { VscClose } from "react-icons/vsc";
import SelectPaymentMethod from "./SelectPaymentMethod";
import CheckoutForm from "./CheckoutForm";
import UserInfoCheckout from "./UserInfoCheckout";
import ChangeAndDelivery from "./ChangeAndDelivery";
import { useNavigate } from "react-router-dom";

const UserItems = () => {
  const { Status } = useStatus();
  const FullName = Status?.fullname?.split(" ") || ["", ""];

  const [Checkout, setCheckout] = useState({
    paymentMethod: "",
    promocode: "",
    changefor: 0,
    orderName: FullName ? FullName[0] + " " + FullName[1] : "",
    orderEmail: Status?.email || "",
    orderPhone: 0,
    orderAddress: "",
    specialInstructions: "",
  });

  const { data: UserCart } = useQuery({
    queryKey: ["cart"],
    queryFn: async () =>
      await fetchGetUserCartByUserId(
        Status!.userId,
        localStorage.getItem("token")!
      ),
  }) as UseQueryResult<Icart, Error>;
  const navigate = useNavigate();

  return (
    <section className="py-10 w-full min-h-screen">
      <div className=" w-full flex flex-col gap-10 items-center ">
        <div className="w-3/4 flex items-center justify-start">
          <p className=" font-Poppins text-white font-normal text-5xl">
            Hello{" "}
            <span className=" text-custom-light-purple">
              {Status?.fullname.split(" ")[0]}{" "}
            </span>
            This Is Your Cart
          </p>
        </div>
        <div className="w-3/4 border-b flex justify-between text-white font-cabin text-sm font-semibold">
          <p
            onClick={() => navigate("/")}
            className=" cursor-pointer hover:text-custom-light-purple transition-all delay-100 ease-linear "
          >
            Continue Shopping
          </p>
          <p>{UserCart?.cartItemsNumber} Items</p>
          <p>
            Need Help? Call{" "}
            <span className=" text-custom-light-purple cursor-pointer">
              <a href="tel:81674891">+961 81 674 891</a>
            </span>
          </p>
        </div>
        <div className=" w-full h-auto flex flex-col items-center gap-1">
          <div className="w-3/4 h-auto flex items-start justify-between gap-1">
            <div className=" w-full h-auto flex flex-col gap-3">
              <Items Status={Status} />
            </div>
            <div className=" h-auto w-1/3 flex flex-col gap-1 ">
              <CheckoutBar
                Status={Status}
                setCheckout={setCheckout}
                Checkout={Checkout}
                subtotal={UserCart?.cartTotal!}
              />
              <SelectPaymentMethod
                setCheckout={setCheckout}
                Checkout={Checkout}
              />
              <CheckoutForm
                setCheckout={setCheckout}
                Checkout={Checkout}
                Status={Status!}
              />
            </div>
          </div>
          <div className="w-3/4 h-auto flex flex-col gap-1">
            <UserInfoCheckout
              Status={Status}
              setCheckout={setCheckout}
              Checkout={Checkout}
            />
            <ChangeAndDelivery setCheckout={setCheckout} Checkout={Checkout} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Items = ({ Status }: any) => {
  const {
    data: cartitems,
    isLoading: cartloading,
    isError: carterror,
  } = useQuery({
    queryKey: ["CartItems"],
    queryFn: async () =>
      await fetchGetAllUserProducts(
        Status!.userId,
        localStorage.getItem("token")!
      )!,
  });

  console.log(cartitems);

  return (
    <section className="w-full bg-custom-dark-ke7li text-white font-Poppins">
      {cartitems?.map((items: IuserProduct, index: number) => {
        const isLastItem = index === cartitems.length - 1;
        return (
          <div
            className={`p-4 px-6 flex flex-col gap-2 ${
              isLastItem ? "border-none" : "border-b border-custom-ke7li"
            } `}
            key={items.productId}
          >
            <div>
              <p className=" text-custom-light-purple font-bold text-sm">
                {items.productTitle}
              </p>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className=" w-24 h-24 flex items-center justify-center">
                <img
                  className="w-24 h-24 object-cover object-center"
                  src={items.productPicture!}
                  alt=""
                />
              </div>
              <div className=" text-xs font-bold font-cabin">
                <p className=" font-Poppins font-light">SKU</p>
                <p>In Stock</p>
              </div>
              <div className=" text-xs font-bold font-cabin">
                <p className=" font-Poppins font-light">Each</p>
                <p>${items.productPrice / items.qty}</p>
              </div>
              <div className=" text-xs font-bold font-cabin flex flex-col items-center justify-center">
                <p className=" font-Poppins font-light">Quantity</p>
                <div className=" flex gap-3">
                  <p>-</p> <p>{items.qty}</p> <p>+</p>
                </div>
              </div>
              <div className=" text-xs font-bold font-cabin flex flex-col items-center justify-center">
                <p className=" font-Poppins font-light ">Total</p>
                <p className=" text-custom-light-purple">
                  ${items.productPrice}
                </p>
              </div>
              <div className=" text-xs font-bold font-cabin">
                <VscClose />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default UserItems;
