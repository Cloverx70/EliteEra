import { fetchGetAllUsers } from "@/api";
import { UserData } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaCircleUser, FaUser } from "react-icons/fa6";

const UsersScreen = () => {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await fetchGetAllUsers(),
  });

  return (
    <section className="w-full h-full  font-Poppins overflow-y-scroll">
      <div className=" w-full h-full p-5  flex flex-col gap-5">
        {users?.map((item: UserData) => {
          return (
            <div key={item.userId} className="bg-white w-full h-auto p-5">
              <div className=" flex w-full justify-start items-center  ">
                <div className="  px-5 ">
                  {item.userpfp !== "" ? (
                    <div className="w-14 h-14 object-cover">
                      <img
                        src={item?.userpfp}
                        alt={"pfp"}
                        className="object-cover w-full h-full  ring ring-custom-light-purple rounded-full p-0.5"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 object-cover">
                      <FaCircleUser className="object-center w-full h-full text-custom-dark-ke7li cursor-pointer bg-white rounded-full ring  p-0.5 ring-custom-light-purple" />
                    </div>
                  )}
                </div>
                <div className=" flex flex-col items-start justify-center  p-5 ">
                  <p className=" text-xl font-semibold text-custom-light-purple">
                    {item.username}
                  </p>
                  <p className=" text-sm font-cabin font-bold text-custom-ke7li">
                    {item.email}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UsersScreen;
