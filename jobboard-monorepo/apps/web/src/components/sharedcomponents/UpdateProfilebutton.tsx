import { Pencil } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { editprofile } from "@/lib/types/user";
import { EditProfileForm } from "./Profileform";

const DialogDemo: React.FC<{ profile: editprofile }> = ({ profile }) => {
  {
    if (profile) {
      const { description, date_of_birth, location, sociallinks } = profile;
      const editprofileobject = {
        description,
        date_of_birth,
        location,
        sociallinks,
      };
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-lg   h-5/6 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Edit about me</DialogTitle>
          <DialogDescription>
            Make changes to your about me Description here. Click save when
            you`&apos;`re done.
          </DialogDescription>
        </DialogHeader>
        <EditProfileForm profile={profile} />
      </DialogContent>
    </Dialog>
  );
};

const UpdateProfilebutton: React.FC<{ profile: editprofile }> = ({
  profile,
}) => {
  return <DialogDemo profile={profile} />;
};

export default UpdateProfilebutton;
