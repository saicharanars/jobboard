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

const AuthDialog = () => {
  return (
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
  );
};

export default AuthDialog;
