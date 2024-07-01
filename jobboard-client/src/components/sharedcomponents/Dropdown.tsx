import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useContext } from "react";
import AuthContext from "@/lib/context/auth";

const Dropdown = () => {
  const { logout } = useContext(AuthContext);

  const logouthandler = () => {
    logout();
  };

  return (
    <div className="xs:hidden md:block">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 overflow-hidden rounded-full cursor-pointer">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-10 p-5">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <Button onClick={logouthandler} variant="outline">
            Logout
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Dropdown;
