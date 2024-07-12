import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Job } from "@/lib/types/job"; // Import your Job type
import { useAddApplicationMutation } from "@/lib/redux/applyjobs/applicationsapi";
import AuthContext from "@/lib/context/auth";

export function Applicationform({ job }: { job: Job }) {
  const [answers, setAnswers] = useState<string[]>([]);
  const authctx = useContext(AuthContext);
  const [AddApplication, { isLoading: isAdding, error, isSuccess }] =
    useAddApplicationMutation();

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const applicationObj = {
      resume_url: "https://claude.ai/chat/23142aaa-4fde-496b-b6b0-f9f1f98f41da",
      answers: answers,
    };
    console.log(applicationObj);
    try {
      const addApplication = await AddApplication({
        application: applicationObj,
        token: authctx.token,
        jobId: job.id,
      }).unwrap();
      console.log(addApplication);
    } catch (err) {
      console.error("Failed to submit application: ", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-700 hover:bg-blue-900">Apply now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Answer these questions</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form onSubmit={handleSubmit} className="space-y-8">
            {job.questions.map((question, index) => (
              <div key={index} className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor={`question-${index}`}>{question}</Label>
                <Input
                  id={`question-${index}`}
                  value={answers[index] || ""}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              </div>
            ))}
            <DialogFooter>
              <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-900 " disabled={isAdding}>
                {isAdding ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
            {error && (
              <p className="text-red-500">
                {(error as any).data.message || "An error occurred"}
              </p>
            )}
            {isSuccess && (
              <p className="text-green-500">
                Application submitted successfully!
              </p>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
