import { UserData } from "@/interfaces";
import React, { ChangeEvent, useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
type UserInfoCheckoutProps = {
  Status: UserData | null;
  setCheckout: React.Dispatch<
    React.SetStateAction<{
      paymentMethod: string;
      promocode: string;
      changefor: number;
      orderName: string;
      orderEmail: string;
      orderPhone: number;
      orderAddress: string;
      specialInstructions: string;
    }>
  >;
  Checkout: {
    paymentMethod: string;
    promocode: string;
    changefor: number;
    orderName: string;
    orderEmail: string;
    orderPhone: number;
    orderAddress: string;
    specialInstructions: string;
  };
};

const UserInfoCheckout = ({
  Status,
  setCheckout,
  Checkout,
}: UserInfoCheckoutProps) => {
  const FullName = Status?.fullname?.split(" ") || ["", ""];
  const Fname: string = FullName[0];
  const Lname: string = FullName[1];

  const [FullNameForm, setFullNameForm] = useState({
    Fname: Fname,
    Lname: Lname,
  });

  useEffect(() => {
    console.log(Checkout);
  }, [Checkout]);

  const handleOnChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckout({ ...Checkout, orderPhone: parseInt(e.target.value) });
  };

  const handleOnChangEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckout({ ...Checkout, orderEmail: e.target.value });
  };

  const handleOnChangeFname = (e: ChangeEvent<HTMLInputElement>) => {
    setFullNameForm({ ...FullNameForm, Fname: e.target.value });

    setCheckout({
      ...Checkout,
      orderName: FullNameForm.Fname + " " + FullNameForm.Lname,
    });
  };

  const handleOnchangeSpecialInstructions = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCheckout({ ...Checkout, specialInstructions: e.target.value });
  };

  const handleOnChangeLname = (e: ChangeEvent<HTMLInputElement>) => {
    setFullNameForm({ ...FullNameForm, Lname: e.target.value });
    setCheckout({
      ...Checkout,
      orderName: FullNameForm.Fname + " " + FullNameForm.Lname,
    });
  };

  return (
    <section className=" w-full h-auto bg-white font-bold font-Poppins text-sm py-6 px-6">
      <div className=" w-full flex flex-col gap-4">
        <p className=" text-base ">Please Fill The Form Below</p>
        <form action="" className=" w-full flex flex-col gap-3">
          <div className=" flex w-full gap-4">
            <div className=" flex flex-col w-full">
              <label htmlFor="">First Name</label>
              <input
                onChange={handleOnChangeFname}
                required
                value={FullNameForm.Fname}
                placeholder="John"
                type="text"
                className=" w-full h-8 border-2 border-custom-dark-ke7li text-xs font-semibold px-2  "
              />
            </div>

            <div className=" flex flex-col w-full">
              <label htmlFor="">Last Name</label>
              <input
                onChange={handleOnChangeLname}
                value={FullNameForm.Lname}
                required
                placeholder="Doe"
                type="text"
                className=" w-full h-8 border-2 border-custom-dark-ke7li  text-xs font-semibold px-2"
              />
            </div>
          </div>
          <div className=" flex w-full gap-4">
            <div className=" flex flex-col w-full">
              <label htmlFor="">Phone</label>
              <input
                required
                onChange={handleOnChangeNumber}
                placeholder="01 234567"
                type="number"
                className=" w-full h-8 border-2 border-custom-dark-ke7li  text-xs  font-semibold  px-2"
              />
            </div>

            <div className=" flex flex-col w-full">
              <label htmlFor="">Email</label>
              <input
                onChange={handleOnChangEmail}
                required
                value={Checkout?.orderEmail}
                placeholder="1234@example.com"
                type="text"
                className=" w-full h-8 border-2 border-custom-dark-ke7li text-xs font-semibold px-2"
              />
            </div>
          </div>
          <div>
            <label htmlFor="">Special Order Instructions</label>
            <textarea
              name="instructions"
              id="instructions"
              cols={30}
              rows={10}
              value={Checkout?.specialInstructions}
              onChange={handleOnchangeSpecialInstructions}
              placeholder="If you have any more instructions please write them here..."
              className=" w-full border-2 border-custom-dark-ke7li text-xs font-semibold p-2"
            ></textarea>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserInfoCheckout;
