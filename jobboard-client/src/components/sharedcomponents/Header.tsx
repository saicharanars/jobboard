import { Button } from "../ui/button";
import Authbutton from "./AuthButton";
// import Heading from "./Heading";
import Sidesheet from "./Sidesheet";

const Header = () => {
  return (
    <>
      <div className="  h-12 flex justify-between align-middle content-center  bg-whilte-200 sm:px-1 md:px-5  ">
        <div className="  h-12 flex justify-around align-middle content-center  ">
          <h1 className="  text-xl text-black-200 font-bold p-2  ">
            Job Huntly
          </h1>
          <p className=" hidden md:block  text-xl text-slate-400  p-2   ">Find jobs</p>
          <p className=" hidden md:block  text-xl text-slate-400  p-2  ">Browse Companies</p>
        </div>
        <div className="   flex  justify-around align-middle content-center p-2 gap-5 ">
          <Authbutton/>
        </div>
      </div>
    </>
  );
};

export default Header;

