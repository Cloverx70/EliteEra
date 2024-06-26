import { UserData } from "@/interfaces";
import React, { ChangeEvent, useEffect } from "react";
import { Label } from "@/components/ui/label";

type CheckoutFormProps = {
  Status: UserData;
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

const CheckoutForm = ({ Status, setCheckout, Checkout }: CheckoutFormProps) => {
  const handleOnChangeAdress = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckout({ ...Checkout, orderAddress: e.target.value });
  };

  useEffect(() => {
    console.log(Checkout);
  }, [Checkout]);

  return (
    <section className="w-full h-[220px] bg-white font-Poppins">
      <div className="h-auto flex flex-col gap-5 items-start p-4 px-6">
        <label htmlFor="" className="font-bold text-custom-dark-ke7li text-sm">
          Choose Delivery Address
        </label>
        <div className="w-full flex flex-col items-start gap-5">
          <div className="w-full h-auto flex items-start gap-1">
            <input
              type="radio"
              onChange={handleOnChangeAdress}
              value={Status?.addressone}
              id="option-one"
              checked={Checkout.orderAddress === Status.addressone}
              className="mt-1 cursor-pointer"
            />
            <div className="w-full flex flex-col gap-1">
              <Label htmlFor="option-one" className="font-semibold text-sm">
                Address One
              </Label>
              <input
                className="selection:bg-none border-2 text-xs font-semibold outline-none text-custom-ke7li border-custom-dark-ke7li w-full h-9 px-2"
                type="text"
                readOnly
                value={Status?.addressone}
              />
            </div>
          </div>
          <div className="w-full h-auto flex items-start gap-1">
            <input
              type="radio"
              onChange={handleOnChangeAdress}
              value={Status?.addresstwo}
              checked={Checkout.orderAddress === Status.addresstwo}
              id="option-two"
              className="mt-1 cursor-pointer"
            />
            <div className="w-full flex flex-col gap-1">
              <Label htmlFor="option-two" className="font-semibold text-sm">
                Address Two
              </Label>
              <input
                className="selection:bg-none border-2 text-xs font-semibold outline-none text-custom-ke7li border-custom-dark-ke7li w-full h-9 px-2"
                type="text"
                readOnly
                value={Status?.addresstwo}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;
