import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import WhishToWish from "../checkoutScreensNav/Components/WhishToWish";
const CheckoutScreensNav = () => {
  const { pmethod, checkoutid } = useParams<{
    pmethod: string;
    checkoutid: string;
  }>();

  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className=" w-full h-auto ">
      <WhishToWish checkoutid={parseInt(checkoutid!)} ref={ref} />
    </section>
  );
};

export default CheckoutScreensNav;
