"use client";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useContext } from "react";
import AuthContext from "@/lib/context/auth";
import { useRouter } from "next/navigation";
import { Ellipsis, Pencil, Plus, User, X } from "lucide-react";
import { Job } from "@/lib/types/job";
import axios from "axios";
import { useDeleteJobMutation } from "@/lib/redux/jobsapi";
import { useDispatch } from "react-redux";
import { deletejobslice } from "@/lib/redux/Jobreducer";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import AddJobForm from "./AddJobForm";
import { DialogTitle } from "@radix-ui/react-dialog";

interface OptionsProps {
  item: Job;
}

const Options: React.FC<OptionsProps> = ({ item }) => {
  const dispatch = useDispatch();
  const authctx = useContext(AuthContext);
  const [deleteJob] = useDeleteJobMutation();

  const Delete = async () => {
    try {
      await deleteJob({ id: item.id, token: authctx.token });
      console.log("Deleted item:", item.id);
      dispatch(deletejobslice(item));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div className="flex flex-row items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col justify-center w-full">
          <DropdownMenuItem onSelect={Delete}>
            <button className="flex flex-row justify-center w-full gap-2">
              <X className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </button>
          </DropdownMenuItem>

          <Dialog>
            <DialogTrigger asChild>
              <button className="flex flex-row justify-center w-full gap-2">
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </button>
            </DialogTrigger>
            <DialogContent className="p-4">
              <DialogTitle></DialogTitle>
              <AddJobForm job={item} />
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Options;
