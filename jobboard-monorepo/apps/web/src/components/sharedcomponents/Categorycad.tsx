import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MoveRight } from "lucide-react";
interface Categorycad {
  icon: React.ReactNode;
  text: string;
}
const Categorycard: React.FC<Categorycad> = ({
  icon: Iconcomponent,
  text: text,
}) => {
  return (
    <>
      <div>
        <Card className="  flex flex-row max-h-44 overflow-hidden justify-between align-middle items-center md:flex-col  border bg-card text-card-foreground shadow-sm p-1 md:p-5 hover:bg-blue-600  text-blue-600 hover:text-white">
          <CardHeader>{Iconcomponent}</CardHeader>
          <CardContent className="p-2 flex items-center flex-col font-bold justify-center align-middle ">
            <h1 className=" font-bold text-xl md:text-2xl  overflow-clip  line-clamp-1 ">
              {" "}
              {text}
            </h1>
            <p className="text-black hover:text-white"> 200 jobs available</p>
          </CardContent>
          <CardFooter className="p-2 flex items-center justify-center align-middle gap-3">
            <button className="hidden md:block">
              <MoveRight />
            </button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Categorycard;
