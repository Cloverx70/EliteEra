import React, { ChangeEvent } from "react";
import { Label } from "@/components/ui/label";

type PaymentMethodProps = {
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

const SelectPaymentMethod = ({ setCheckout, Checkout }: PaymentMethodProps) => {
  const handlePaymentMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckout({ ...Checkout, paymentMethod: e.target.value });
  };

  return (
    <section className="bg-white w-full h-40 font-Poppins text-sm p-6">
      <div className="flex flex-col h-full gap-4">
        <p className="font-bold">Choose Payment Method</p>
        <div className="px-2 h-full flex flex-col items-start justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="cod"
              name="paymentMethod"
              value="cod"
              className=" cursor-pointer"
              checked={Checkout?.paymentMethod === "cod"}
              onChange={handlePaymentMethodChange}
            />
            <Label htmlFor="cod">COD (Cash On Delivery)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="visa"
              name="paymentMethod"
              value="visa"
              className=" cursor-pointer"
              checked={Checkout?.paymentMethod === "visa"}
              onChange={handlePaymentMethodChange}
            />
            <Label htmlFor="visa">Whish Money (Visa Link Payment)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="w2w"
              name="paymentMethod"
              value="w2w"
              className=" cursor-pointer"
              checked={Checkout?.paymentMethod === "w2w"}
              onChange={handlePaymentMethodChange}
            />
            <Label htmlFor="w2w">Whish Money (Whish To Whish)</Label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectPaymentMethod;
