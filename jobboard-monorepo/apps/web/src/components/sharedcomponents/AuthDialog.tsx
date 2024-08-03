import { UserRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Authform from "./Authform";
import { useContext, useEffect } from "react";
import AuthContext from "@/lib/context/auth";
import Dropdown from "./Dropdown";

const AuthDialog = () => {
  const { isLoggedIn, login } = useContext(AuthContext);
  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);
  return (
    <>
      {isLoggedIn ? (
        <Dropdown />
      ) : (
        <>
          <Dialog>
            <DialogTrigger>
              <UserRound />
            </DialogTrigger>
            <DialogContent className="p-4 ">
              <Authform />
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default AuthDialog;
