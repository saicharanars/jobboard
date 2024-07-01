import img from "/public/Element.png";
import Authform from "./Authform";
import Image from "next/image";

const Login = () => {
  return (
    <>
        
        <div className="p-1 md:px-4 container my-2 max-w-sm">
          <Authform />
        </div>
        
      
    </>
  );
};

export default Login;
