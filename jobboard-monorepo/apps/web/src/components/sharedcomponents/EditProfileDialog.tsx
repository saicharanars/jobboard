import React, { useState } from "react";
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
const EditProfileDialog: React.FC<{ profile: editprofile }> = ({ profile }) => {
  const [receivedprofile, Setreceievedprofile] = useState<editprofile>({
    description: "",
    date_of_birth: "",
    location: "",
    sociallinks: {
      linkedin: "",
      github: "",
      website: "",
    },
  });
  {
    if (profile) {
      Setreceievedprofile(profile);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit about me</Button>
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

export default EditProfileDialog;
