import React, { useCallback, useState } from "react";
import { AiFillMinusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  const [EnterTshirt, setEnterTshirt] = useState(false);

  const handleChangeOnEnterTshirt = useCallback(() => {
    setEnterTshirt((prev) => !prev);
  }, []);

  const [EnterCaps, setEnterCaps] = useState(false);

  const handleChangeOnEnterCaps = useCallback(() => {
    setEnterCaps((prev) => !prev);
  }, []);

  const [EnterSweat, setEnterSweat] = useState(false);

  const handleChangeOnEnterSweat = useCallback(() => {
    setEnterSweat((prev) => !prev);
  }, []);

  const [EnterHoodies, setEnterHoodies] = useState(false);

  const handleChangeOnEnterHoodies = useCallback(() => {
    setEnterHoodies((prev) => !prev);
  }, []);

  return (
    <>
      <section className="w-full border-b-2 border-custom-ke7li grid grid-cols-2 sm:grid-cols-1 custom-mobile:grid-cols-1">
        <div className="pl-10 border-r custom-mobile:border-r-0 sm:border-r-0 border-b z-10 overflow-hidden border-custom-ke7li relative h-[350px] sm:h-[200px] flex justify-between">
          <p className=" z-10 top-16 sm:top-[-6px] sm:text-[150px] absolute left-[-50px] text-custom-ke7li/20 font-bold text-[200px] ">
            CAPS
          </p>

          <div className="flex flex-col justify-around">
            <div className="flex flex-col gap-3">
              <p className="text-sm text-custom-ke7li">Starting From</p>
              <p className="font-bold text-4xl text-custom-light-purple">
                $ 29
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-4xl font-bold text-white">Caps</p>
              <div
                onMouseEnter={handleChangeOnEnterCaps}
                onMouseLeave={handleChangeOnEnterCaps}
                className="flex gap-3 items-center z-20"
                onClick={() => navigate(`/category/${"caps"}`)}
              >
                <AiFillMinusCircle
                  size={30}
                  className={`rounded-full ring-1 cursor-pointer transition-all delay-100 ease-linear ring-custom-light-purple text-white ${
                    EnterCaps ? `rotate-90  ` : ` `
                  }`}
                />
                <p
                  className={`text-base font-cabin transition-all delay-100 ease-linear cursor-pointer ${
                    EnterCaps ? ` text-custom-light-purple` : `text-white`
                  }`}
                >
                  BROWSE
                </p>
              </div>
            </div>
          </div>
          <div className="z-20 ">
            <img
              className="w-[300px] md:w-[230px] md:mt-10 sm:w-[180px] custom-mobile:w-[230px] custom-mobile:mt-8 "
              src="./src/pages/HomePage/assets/categoriespics/websitecaps.png"
              alt=""
            />
          </div>
        </div>

        <div className="pl-10  z-20 border-b overflow-hidden border-custom-ke7li relative h-[350px] sm:h-[200px] flex justify-between">
          <p className=" z-10 top-16 sm:top-[-6px] sm:text-[150px] absolute left-[-50px] text-custom-ke7li/20 font-bold text-[200px] ">
            TSHIRTS
          </p>

          <div className="flex flex-col justify-around">
            <div className="flex flex-col gap-3">
              <p className="text-sm text-custom-ke7li">Starting From</p>
              <p className="font-bold text-4xl text-custom-light-purple">
                $ 84
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-4xl font-bold text-white">T-Shirts</p>
              <div
                onMouseEnter={handleChangeOnEnterTshirt}
                onMouseLeave={handleChangeOnEnterTshirt}
                className="flex gap-3 items-center z-20"
                onClick={() => navigate(`/category/${"tshirts"}`)}
              >
                <AiFillMinusCircle
                  size={30}
                  className={`rounded-full ring-1 cursor-pointer transition-all delay-100 ease-linear ring-custom-light-purple text-white ${
                    EnterTshirt ? `rotate-90  ` : ` `
                  }`}
                />
                <p
                  className={`text-base font-cabin transition-all delay-100 ease-linear cursor-pointer ${
                    EnterTshirt ? ` text-custom-light-purple` : `text-white`
                  }`}
                >
                  BROWSE
                </p>
              </div>
            </div>
          </div>
          <div className="z-20">
            <img
              className="w-[230px] md:w-[200px] md:mt-5 sm:w-[200px] custom-mobile:w-[200px] custom-mobile:mt-5 "
              src="./src/pages/HomePage/assets/categoriespics/websitetshirtss.png"
              alt=""
            />
          </div>
        </div>

        <div className="pl-10 border-r custom-mobile:border-b custom-mobile:border-r-0 sm:border-b  sm:border-r-0 overflow-hidden z-10 border-custom-ke7li relative h-[350px] sm:h-[200px] flex justify-between">
          <p className=" z-10 top-16 sm:top-[-6px] sm:text-[150px] absolute left-[-50px] text-custom-ke7li/20 font-bold text-[200px] ">
            SWEAT
          </p>

          <div className="flex flex-col justify-around ">
            <div className="flex flex-col gap-3">
              <p className="text-sm text-custom-ke7li">Starting From</p>
              <p className="font-bold text-4xl text-custom-light-purple">
                $ 23
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-4xl font-bold text-white">Sweatpants</p>
              <div
                onMouseEnter={handleChangeOnEnterSweat}
                onMouseLeave={handleChangeOnEnterSweat}
                className="flex gap-3 items-center z-20"
                onClick={() => navigate(`/category/${"sweatpants"}`)}
              >
                <AiFillMinusCircle
                  size={30}
                  className={`rounded-full ring-1 cursor-pointer transition-all delay-100 ease-linear ring-custom-light-purple text-white ${
                    EnterSweat ? `rotate-90  ` : ` `
                  }`}
                />
                <p
                  className={`text-base font-cabin transition-all delay-100 ease-linear cursor-pointer  ${
                    EnterSweat ? ` text-custom-light-purple` : `text-white`
                  }`}
                >
                  BROWSE
                </p>
              </div>
            </div>
          </div>
          <div className="z-20 ">
            <img
              className="w-[305px] md:mt-7 md:w-[250px]  sm:w-[250px] custom-mobile:mt-10  "
              src="./src/pages/HomePage/assets/categoriespics/websitePant.png"
              alt=""
            />
          </div>
        </div>

        <div className="pl-10 z-20 overflow-hidden  border-custom-ke7li relative h-[350px] sm:h-[200px] flex justify-between">
          <p className=" z-10 top-16 sm:top-[-6px] sm:text-[150px] absolute left-[-50px] text-custom-ke7li/20 font-bold text-[200px] ">
            HOODIE
          </p>

          <div className="flex flex-col justify-around">
            <div className="flex flex-col gap-3">
              <p className="text-sm text-custom-ke7li">Starting From</p>
              <p className="font-bold text-4xl text-custom-light-purple">
                $ 92
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-4xl font-bold text-white">Hoodies</p>
              <div
                onMouseEnter={handleChangeOnEnterHoodies}
                onMouseLeave={handleChangeOnEnterHoodies}
                className="flex gap-3 items-center z-20"
                onClick={() => navigate(`/category/${"hoodies"}`)}
              >
                <AiFillMinusCircle
                  size={30}
                  className={`rounded-full ring-1 cursor-pointer transition-all delay-100 ease-linear ring-custom-light-purple text-white ${
                    EnterHoodies ? `rotate-90  ` : ` `
                  }`}
                />
                <p
                  className={`text-base font-cabin transition-all delay-100 ease-linear cursor-pointer  ${
                    EnterHoodies ? ` text-custom-light-purple` : `text-white`
                  }`}
                >
                  BROWSE
                </p>
              </div>
            </div>
          </div>
          <div className="z-20 ">
            <img
              className="w-[230px] custom-mobile:w-[210px] custom-mobile:mt-4 brightness-75 md:w-[200px] md:mt-7 sm:w-[200px] sm:mt-1 "
              src="./src/pages/HomePage/assets/categoriespics/hoodieverctormockup.png"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
