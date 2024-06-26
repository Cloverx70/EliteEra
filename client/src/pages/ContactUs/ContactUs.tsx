import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contactus = () => {
  const form = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState("");

  const sendEmail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (form.current) {
      setMessage("Sending...");

      emailjs
        .sendForm(
          "service_fm6unp6",
          "template_pe17x8r",
          form.current,
          "fHoLaE_E5bXes4KgY"
        )
        .then(
          () => {
            console.log("SUCCESS!");
            setMessage("Your message was sent successfully!");
          },
          (error) => {
            console.log("FAILED...", error.text);
            setMessage("Failed to send the message. Please try again later.");
          }
        )
        //@ts-ignore
        .finally(() => setMessage(""));
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col gap-8 items-center justify-center text-white">
      <div className="flex flex-col gap-2">
        <p className="font-bold text-5xl">
          CONTACT <span className="text-custom-light-purple"> US</span>
        </p>
        <p className="font-poppins text-sm">
          If you're dealing with any problems, please let us know.
        </p>
      </div>
      <form
        ref={form}
        className="flex flex-col gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold text-sm">
            Name
          </label>
          <input
            placeholder="John Doe"
            type="text"
            id="name"
            name="user_name"
            className="w-[350px] outline-none bg-transparent border-b h-8"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold text-sm">
            Email
          </label>
          <input
            placeholder="johndoe@example@gmail.com"
            type="email"
            id="email"
            name="user_email"
            className="w-[350px] outline-none bg-transparent border-b h-8"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Message</label>
          <textarea
            name="message"
            id=""
            cols={50}
            rows={5}
            placeholder="Enter your message here..."
            className="w-[350px] bg-transparent border-b rounded-am outline-none resize-none break-all"
          ></textarea>
        </div>
        <button
          onClick={sendEmail}
          className="text-sm w-24 h-9 rounded-md bg-custom-light-purple"
          type="button"
          disabled={message === "Sending..."}
        >
          {message === "Sending..." ? (
            <div
              className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          ) : (
            "SEND"
          )}
        </button>
      </form>
    </section>
  );
};

export default Contactus;
