import { fetchaddEmailToNewsLetter } from "@/api";
import { createToast } from "@/shared/Toast";
import React, { ChangeEvent, useState } from "react";

const Newsletter = () => {
  const [email, setemail] = useState("");
  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setemail(e.target.value);
    console.log(email);
  };
  const handleOnSubmitNewsLetter = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    await fetchaddEmailToNewsLetter(email).then(() => {
      setemail("");
      createToast("Thank you for subscribing to our newsletter..");
    });
  };
  return (
    <>
      <section className=" w-full h-[250px] pt-5 pb-5 bg-custom-light-purple flex  justify-center items-center text-white font-Poppins font-bold">
        <div className=" flex flex-col gap-5 items-center">
          <p className=" font-cabin font-bold text-4xl sm:text-3xl custom-mobile:text-3xl">
            WELCOME TO THE ELITE ERA
          </p>
          <p className=" font-normal text-center">
            Subscribe to our newsletter and benefit from{" "}
            <br className=" sm:visible md:hidden" /> a 10% discount on your next
            order
          </p>
          <div className=" flex flex-col gap-1">
            <form>
              <div className="flex items-center gap-5 ">
                <input
                  className=" w-96 custom-mobile:w-52 sm:w-60 h-8 outline-none font-normal text-base placeholder-white pl-3 custom-placeholder  bg-transparent border border-white"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleOnChangeEmail}
                  placeholder="johndoe@example.com"
                />
                <button
                  onClick={handleOnSubmitNewsLetter}
                  type="submit"
                  className=" font-normal border w-32 h-8  border-white"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div>
              <p className=" text-xs font-normal italic">
                No spam, we hate it more than you do
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
