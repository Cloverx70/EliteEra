import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import React, {
  ChangeEvent,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import { fetchLogin, fetchStatus } from "../../../api";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import { TiArrowLeft } from "react-icons/ti";
import { BsCapslockFill } from "react-icons/bs";
const Login = () => {
  const navigate = useNavigate();
  const client = useQueryClient();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [localStorage.getItem("token")]);

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

  const [logincreds, setlogincreds] = useState({
    email: "",
    password: "",
  });

  const [windowstate, setwindowstate] = useState({
    Login: true,
    Signup: false,
  });

  const [capslockstate, setcapslockstate] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setcapslockstate(e.getModifierState("CapsLock"));
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlogincreds({ ...logincreds, email: e.target.value });
  };

  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlogincreds({ ...logincreds, password: e.target.value });
  };

  const handleOnClickLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);

    if (logincreds.email === "") {
      setIsLoading(false);
      setIsError(true);
    } else if (
      !logincreds.email.includes("@gmail.com") &&
      !logincreds.email.includes("@hotmail.com") &&
      !logincreds.email.includes("@outlook.com") &&
      !logincreds.email.includes("@email.com")
    ) {
      setIsError(true);
      setIsLoading(false);
    } else {
      setIsError(false);
      login();
    }
  };

  async function login() {
    try {
      const response = await fetchLogin(
        sanitizeInput(logincreds.email),
        sanitizeInput(logincreds.password)
      );
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      setIsError(true);
      setlogincreds({ ...logincreds, email: "", password: "" });
    } finally {
      setIsLoading(false);
    }
  }

  const handleOnClickLoginBtn = () => {
    setwindowstate({ ...windowstate, Login: true, Signup: false });
  };

  const handleOnClickSignupBtn = () => {
    setwindowstate({ ...windowstate, Login: false, Signup: true });
  };

  return (
    <section className="w-full h-screen   flex items-center justify-center">
      <div className="flex w-full flex-col items-center   ">
        <div className="w-[900px] sm:justify-center custom-mobile:justify-center md:w-full sm:w-full custom-mobile:w-full flex justify-end md:justify-center">
          <button
            onClick={handleOnClickLoginBtn}
            className={`w-32 h-10 rounded-tl-2xl   font-bold  transition-all delay-75  ease-linear ${
              windowstate.Login
                ? " bg-custom-light-purple text-white windowstateshadow "
                : "bg-white text-custom-light-purple"
            }`}
          >
            Login
          </button>
          <button
            onClick={handleOnClickSignupBtn}
            className={`w-32 h-10 rounded-tr-2xl  font-bold transition-all delay-75 ease-linear ${
              windowstate.Signup
                ? " bg-custom-light-purple  text-white windowstateshadow"
                : "bg-white text-custom-light-purple"
            }`}
          >
            Sign up
          </button>
        </div>
        {windowstate.Signup && <Signup />}
        {windowstate.Login && (
          <div className="w-[900px] h-[380px] px-14 sm:w-full md:w-full custom-mobile:w-full custom-mobile:rounded-none sm:rounded-none md:rounded-none shadow-custom bg-white relative rounded-l-2xl rounded-br-2xl flex items-center justify-between ">
            <TiArrowLeft
              size={30}
              className=" absolute top-5 left-5 text-custom-light-purple cursor-pointer hover:text-custom-ke7li delay-100 ease-in-out"
              onClick={() => navigate("/")}
            />
            <div className="flex flex-col items-center   ">
              <form
                action=""
                className="w-full flex flex-col items-start justify-start"
              >
                <p className="text-4xl text-custom-dark-ke7li font-bold mb-6">
                  LOGIN
                </p>
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="email"
                    className="font-bold text-custom-light-purple"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-96 h-8 md:w-80 bg-transparent outline-none border-b border-custom-dark-ke7li pl-1 custom-placeholder"
                    placeholder="1234@example.com"
                    value={logincreds.email}
                    onChange={handleOnChangeEmail}
                  />
                  {isError && (
                    <p className="mt-2 text-sm text-red-500 font-bold">
                      Invalid email
                    </p>
                  )}
                </div>

                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="password"
                    className="font-bold text-custom-light-purple"
                  >
                    Password
                  </label>
                  <div className=" relative">
                    <input
                      type="password"
                      id="password"
                      className="w-96 h-8 md:w-80 relative bg-transparent outline-none border-b border-custom-dark-ke7li pl-1 custom-placeholder"
                      placeholder="type your password here..."
                      value={logincreds.password}
                      onChange={handleOnChangePassword}
                    />
                    {capslockstate && (
                      <BsCapslockFill className=" text-custom-light-purple absolute top-2 right-0" />
                    )}
                  </div>
                </div>
                <button
                  onClick={handleOnClickLogin}
                  className=" w-32 h-9 text-white font-bold bg-custom-light-purple rounded-md hover:bg-custom-dark-ke7li transition-all delay-100 ease-in-out"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div
                      className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
            <div className=" w-[1px] h-[200px] sm:hidden bg-custom-dark-ke7li/25 custom-mobile:hidden" />
            <div className=" flex w-auto  items-center custom-mobile:hidden sm:hidden">
              <p className="text-3xl md:text-2xl font-normal text-center">
                " STYLE IS A WAY TO SAY <br /> WHO YOU ARE WITHOUT <br /> HAVING
                TO SPEAK "
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
