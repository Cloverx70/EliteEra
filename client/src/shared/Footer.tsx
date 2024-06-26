import React from "react";
import { useLocation } from "react-router-dom";

type FooterProps = {
  bgColorAndBorder: string;
};

const Footer = ({ bgColorAndBorder }: FooterProps) => {
  const location = useLocation();
  const FooterActiver = location.pathname === "/";

  return (
    <section
      className={`${bgColorAndBorder}  ${
        FooterActiver ? "" : " border-t border-custom-ke7li"
      } text-white w-full custom-mobile:pl-5 custom-mobile:pr-5 sm:pl-6 sm:pr-6 md:pl-10 md:pr-10 pt-20 pb-20 pl-20 pr-20`}
    >
      <div className=" flex justify-between md:gap-5 italic font-semibold">
        <div>
          <p className=" font-bold text-4xl">ELITE ERA</p>
        </div>
        <div className=" flex flex-col gap-5 ">
          <p>SUPPORT</p>
          <div className=" text-gray-400 ">
            <p className=" text-sm">FAQ</p>
            <p className="text-sm">RETURNS</p>
            <p className=" text-sm">CONTACT SUPPORT</p>
          </div>
        </div>
        <div className=" flex flex-col gap-5">
          <p>CUSTOMER INFORMATION</p>
          <div className=" text-gray-400">
            <p className=" text-sm">RETURN POLICY</p>
            <p className=" text-sm">PRIVACY POLICY</p>
            <p className=" text-sm">RIGHT OF WITHDRAWAL</p>
          </div>
        </div>
        <div className=" flex flex-col gap-5">
          <p>ABOUT ELITE ERA</p>
          <div className="  text-gray-400">
            <p className=" text-sm">ABOUT US</p>
            <p className=" text-sm">BLOG</p>
            <p className=" text-sm">JOBS</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
