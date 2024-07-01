"use client";
import { useContext, useEffect } from "react";
import { Button } from "../ui/button";
import Sidesheet from "./Sidesheet";
import AuthContext from "@/lib/context/auth";
import Dropdown from "./Dropdown";
import AuthDialog from "./AuthDialog";

const AuthButton = () => {
  const { isLoggedIn, login } = useContext(AuthContext);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  const update = () => {
    login("text-xl text-blue-800 font-bold p-2");
  };

  return (
    <>
      {isLoggedIn ? (
        <Dropdown />
      ) : (
        <>
          <div className="hidden md:block h-4/5">

          <AuthDialog />
          </div>
          <div className="sm:block md:hidden">
            <Sidesheet />
          </div>
        </>
      )}
    </>
  );
};

export default AuthButton;
