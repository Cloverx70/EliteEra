import React, { ChangeEvent } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdDeliveryDining } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa6";

type ChangeAndDeliveryProps = {
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

const ChangeAndDelivery = ({
  Checkout,
  setCheckout,
}: ChangeAndDeliveryProps) => {
  const handleOnChangeBringChange = (value: string) => {
    setCheckout({ ...Checkout, changefor: parseInt(value) });
  };

  return (
    <section className="w-full h-auto font-bold text-sm font-Poppins">
      <div className=" flex gap-1">
        <div className="w-1/2 flex gap-2 items-center justify-center p-4 bg-white">
          <FaDollarSign size={20} color="#676eff" />
          <p>Bring Change For</p>
          <Select onValueChange={handleOnChangeBringChange}>
            <SelectTrigger className="w-[130px] ">
              <SelectValue
                className=" placeholder:font-Poppins placeholder:font-normal"
                placeholder="0$"
              />
            </SelectTrigger>
            <SelectContent className="outline-none">
              <SelectGroup className=" font-Poppins font-normal">
                <SelectItem value="10">10$</SelectItem>
                <SelectItem value="20">20$</SelectItem>
                <SelectItem value="50">50$</SelectItem>
                <SelectItem value="100">100$</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-1/2 flex gap-2 items-center justify-center p-4 bg-white">
          <MdDeliveryDining size={30} color="#676eff" />
          <p>Delivery Time</p>
          <input
            type="text"
            placeholder="3-5 Days"
            readOnly
            className=" w-32 h-8  text-sm font-semibold px-2 bg-transparent border border-#757575 rounded-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default ChangeAndDelivery;
