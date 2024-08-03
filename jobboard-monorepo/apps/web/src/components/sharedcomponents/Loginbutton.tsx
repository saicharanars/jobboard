import { Button } from "../ui/button";
import Sidesheet from "./Sidesheet";

const loginbutton = () => {
  return (
    <>
      <h1 className=" hidden md:block  text-xl text-blue-800 font-bold p-2  ">
        Login
      </h1>
      <Button className=" hidden md:block  bg-blue-800 text-white font-bold  rounded-none  ">
        Signup
      </Button>
      <div className="sm:block md:hidden">
        <Sidesheet />
      </div>
    </>
  );
};

export default loginbutton;
