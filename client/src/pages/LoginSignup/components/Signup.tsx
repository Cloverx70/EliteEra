import React, { useState } from "react";
import { fetchRegister } from "../../../api";
import { createToast } from "../../../shared/Toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TiArrowLeft } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
const FormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  username: z
    .string()
    .refine((value) => !/@|!|\.|\'|\"|\[|\]|\(|\)/.test(value), {
      message: "Username cannot contain special characters",
    }),
  fullname: z
    .string()
    .refine((value) => !/@|!|\.|\'|\"|\[|\]|\(|\)/.test(value), {
      message: "Name cannot contain special characters",
    }),
  addressOne: z.string(),
  addressTwo: z.string(),
  birthdate: z.string().refine(
    (value) => {
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 10);
      const inputDate = new Date(value);
      return inputDate <= minDate;
    },
    { message: "You must be at least 10 years old" }
  ),
});

const Signup = () => {
  const sanitizeInput = (input: string) => {
    const specialCharacters = [
      "<",
      ">",
      "&",
      '"',
      "'",
      "/",
      "\\",
      "=",
      "(",
      ")",
      "{",
      "}",
      ";",
      "--",
      "#",
      "/*",
      "*/",
      "%",
      "+",
      "?",
      "\n",
      "\r",
      "\t",
      "\v",
      "\f",
    ];

    if (typeof input !== "string") {
      throw new Error("Input must be a string");
    }

    let sanitized = input;

    for (let char of specialCharacters) {
      const charPattern = new RegExp(
        char.replace(/[*+?^${}()|[\]\\]/g, "\\$&"),
        "g"
      );
      sanitized = sanitized.replace(charPattern, "");
    }

    return sanitized;
  };

  const Formjsx = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      addressOne: "",
      addressTwo: "",
      birthdate: "",
    },
  });

  const handleOnClickSignUp = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    await fetchRegister(
      sanitizeInput(values.username),
      sanitizeInput(values.fullname),
      sanitizeInput(values.email.toLocaleLowerCase()),
      sanitizeInput(values.password),
      sanitizeInput(values.addressOne),
      sanitizeInput(values.addressTwo),
      //@ts-ignore
      values.birthdate
    ).then((item) => {
      if (item) {
        createToast("You registered successfully");
      }
    });
  };

  const navigate = useNavigate();

  return (
    <section className="w-[900px] h-[525px] md:w-full md:rounded-none custom-mobile:w-full custom-mobile:rounded-none sm:w-full sm:rounded-none relative shadow-custom bg-white rounded-l-2xl rounded-br-2xl flex items-center">
      <TiArrowLeft
        size={30}
        className=" absolute top-5 left-5 text-custom-light-purple cursor-pointer hover:text-custom-ke7li delay-100 ease-in-out"
        onClick={() => navigate("/")}
      />
      <div className=" flex flex-col items-start w-full ">
        <p className="text-4xl text-custom-dark-ke7li font-bold mb-6 pl-10">
          SIGNUP
        </p>
        <div className="w-full flex flex-col items-center   ">
          <Form {...Formjsx}>
            <form
              onSubmit={Formjsx.handleSubmit(handleOnClickSignUp)}
              className="space-y-5 w-full px-10"
            >
              <div className="w-full flex  gap-x-10">
                <FormField
                  control={Formjsx.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className=" flex flex-col w-full">
                      <FormLabel className=" text-custom-light-purple text-sm font-bold">
                        Username
                      </FormLabel>
                      <FormControl className="w-full">
                        <input
                          placeholder="ex: johndoe123"
                          {...field}
                          className=" w-full h-8 outline-none bg-transparent border-b border-custom-light-purple custom-placeholder"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={Formjsx.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem className=" flex flex-col w-full">
                      <FormLabel className=" text-custom-light-purple text-sm font-bold">
                        Full Name
                      </FormLabel>
                      <FormControl className="w-full">
                        <input
                          placeholder="ex: John Doe"
                          {...field}
                          className="w-full h-8 outline-none bg-transparent border-b border-custom-light-purple custom-placeholder"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" flex  gap-x-10 w-full">
                <FormField
                  control={Formjsx.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className=" flex flex-col w-full gap-x-10">
                      <FormLabel className=" text-custom-light-purple text-sm font-bold">
                        Email
                      </FormLabel>
                      <FormControl className=" gap-x-10 w-full">
                        <input
                          placeholder="johndoe123@example.com"
                          {...field}
                          className="w-full h-8 outline-none bg-transparent border-b border-custom-light-purple custom-placeholder"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={Formjsx.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className=" flex flex-col w-full gap-x-10">
                      <FormLabel className=" text-custom-light-purple text-sm font-bold">
                        Password
                      </FormLabel>
                      <FormControl className=" w-full gap-x-10">
                        <input
                          placeholder="Type your password here..."
                          {...field}
                          className=" w-full h-8 outline-none bg-transparent border-b border-custom-light-purple custom-placeholder"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" flex  gap-x-10 w-full">
                <FormField
                  control={Formjsx.control}
                  name="addressOne"
                  render={({ field }) => (
                    <FormItem className=" flex flex-col  gap-x-10 w-full">
                      <FormLabel className=" text-custom-light-purple text-sm font-bold">
                        Address Line 1
                      </FormLabel>
                      <FormControl className="w-full gap-x-10">
                        <input
                          placeholder="ex: US, Texas"
                          {...field}
                          className="w-full h-8 outline-none bg-transparent border-b border-custom-light-purple custom-placeholder"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={Formjsx.control}
                  name="addressTwo"
                  render={({ field }) => (
                    <FormItem className=" flex flex-col w-full  gap-x-10">
                      <FormLabel className=" text-custom-light-purple text-sm font-bold">
                        Address Line 2
                      </FormLabel>
                      <FormControl className=" w-full gap-x-10">
                        <input
                          placeholder="ex: US, California"
                          {...field}
                          className="w-full h-8 outline-none bg-transparent border-b border-custom-light-purple custom-placeholder"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={Formjsx.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem className=" flex flex-col  gap-x-10">
                    <FormLabel className=" text-custom-light-purple text-sm font-bold">
                      Birthdate
                    </FormLabel>
                    <FormControl className="  gap-x-10">
                      {/* @ts-ignore */}
                      <input
                        type="date"
                        {...field}
                        className=" w-full h-8 outline-none bg-transparent border-b border-custom-light-purple custom-placeholder"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className=" w-32 h-9 text-white font-bold bg-custom-light-purple rounded-md hover:bg-custom-dark-ke7li transition-all delay-100 ease-in-out"
              >
                Signup
              </button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
