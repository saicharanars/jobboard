import { Pencil } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";
import SectionHeader from "./SectionHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import ProfileForm from "./Profileform";
import { editprofile } from "@/lib/types/user";

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
            you're done.
          </DialogDescription>
        </DialogHeader>
        <ProfileForm profile={profile} />
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
