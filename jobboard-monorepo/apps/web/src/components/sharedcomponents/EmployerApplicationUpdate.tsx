"use client";

import { FC, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateJobApplication } from "@/lib/types/Application";
import { useUpdateApplicationMutation } from "@/lib/redux/applyjobs/applicationsapi";
import AuthContext from "@/lib/context/auth";

const statusEnum = [
  "pending",
  "inreview",
  "shortlisted",
  "interview",
  "declined",
  "hired",
] as const;

type StatusType = (typeof statusEnum)[number];

const updateapplicationsttusSchema = z.object({
  status: z.enum(statusEnum),
});

export type updateapplicationstatus = z.infer<
  typeof updateapplicationsttusSchema
>;

interface EmployerApplicationUpdateProps {
  update: updateapplicationstatus;
  applicationId: string;
}

const EmployerApplicationUpdate: FC<EmployerApplicationUpdateProps> = ({
  update,
  applicationId,
}) => {
  const authCtx = useContext(AuthContext);
  const [appStatus, setAppStatus] = useState<updateapplicationstatus>(update);
  const [updateApplication, { isLoading: isUpdating, error, isSuccess }] =
    useUpdateApplicationMutation();

  const form = useForm<z.infer<typeof updateapplicationsttusSchema>>({
    resolver: zodResolver(updateapplicationsttusSchema),
    defaultValues: {
      status: update.status,
    },
  });

  useEffect(() => {
    console.log("Received applicationId:", applicationId);
    setAppStatus(update);
    form.reset({ status: update.status });
  }, [update, form, applicationId]);

  async function handleStatusChange(value: StatusType) {
    form.setValue("status", value);
    const updateObj: updateJobApplication = {
      status: value,
    };
    console.log("Status updated:", updateObj, applicationId); // Debugging step

    try {
      const update = await updateApplication({
        application: updateObj,
        token: authCtx.token,
        applicationId: applicationId,
      }).unwrap();
      console.log(update);
      setAppStatus({ status: value });
    } catch (err) {
      console.error("Failed to update application:", err);
    }
  }

  return (
    <Form {...form}>
      <div className="w-full">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={handleStatusChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={appStatus.status} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statusEnum.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export default EmployerApplicationUpdate;
