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
import ProfileForm from "./Profileform";
import { editprofile } from "@/lib/types/user";
const EditProfileDialog: React.FC<{ profile: editprofile }> = ({ profile }) => {
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
        <ProfileForm />
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
