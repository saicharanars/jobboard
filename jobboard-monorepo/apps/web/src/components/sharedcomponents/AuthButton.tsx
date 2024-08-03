"use client";
import { useContext, useEffect } from "react";
import AuthContext from "@/lib/context/auth";
import Dropdown from "./Dropdown";
import AuthDialog from "./AuthDialog";
import Sidesheet from "./Sidesheet";

const AuthButton = () => {
  return (
    <>
      <div className="hidden md:block h-4/5">
        <AuthDialog />
      </div>
      <div className="md:hidden">
        <Sidesheet />
      </div>
    </>
  );
};

export default AuthButton;
