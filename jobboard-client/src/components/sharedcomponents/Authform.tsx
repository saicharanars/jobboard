"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import AuthContext from "@/lib/context/auth";
import { useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
  name: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(20, {
      message: "Password must not be more than 20 characters.",
    }),
  mobile_number: z.coerce.number(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(20, {
      message: "Password must not be more than 20 characters.",
    }),
});

const Authform = () => {
  const router = useRouter();
  const authctx = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [signupstatus, setSignupstatus] = useState(false);
  const [err, setErr] = useState("");
  // State to manage loading
  const signupform = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      mobile_number: 12345678,
      email: "",
      password: "",
    },
  });
  const loginform = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const signup = async (values: z.infer<typeof signupSchema>) => {
    const parsedValues = {
      ...values,
      mobile_number: Number(values.mobile_number),
    };
    console.log(parsedValues);

    setLoading(true); // Start loading

    try {
      const signupResponse = await axios.post(
        "http://localhost:3001/auth/signup",
        parsedValues
      );
      console.log(signupResponse.data);
      setSignupstatus(true);
      setTimeout(() => {
        setSignupstatus(false);
      }, 5000);

      // After successful login, you might want to redirect or show a success message
    } catch (error) {
      console.log(error);
      setErr(error.response.data.message);
      setTimeout(() => {
        setSignupstatus(false);
        setErr("");
      }, 5000);
      // Handle login error, show a message to the user
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const Login = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true); // Start loading

    try {
      const loginResponse = await axios.post(
        "http://localhost:3001/auth/login",
        values
      );
      console.log(loginResponse.data);
      authctx.login(loginResponse.data.access_token);
      router.push("/");
      // After successful login, you might want to redirect or show a success message
    } catch (error) {
      console.log(error);
      if(error.response){

          setErr(error.response.data.message);
      }
      else{
        setErr(error.message);
      }
      // Handle login error, show a message to the user
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Tabs defaultValue="signup">
      <TabsList className="grid w-full grid-cols-2 bg-blue-50">
        <TabsTrigger value="signup" className="text-blue-500">
          Account
        </TabsTrigger>
        <TabsTrigger value="login">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Get More Opportunities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <Form {...signupform}>
              <form
                onSubmit={signupform.handleSubmit(signup)}
                className="space-y-1"
              >
                <FormField
                  control={signupform.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupform.control}
                  name="mobile_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile number</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your Mobile number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupform.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupform.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-800 text-white hover:bg-blue-900"
                >
                  Signup
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            {loading && (
              <div className=" flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </div>
            )}
            {err && <p className="text-red-500">{err}</p>}
            {signupstatus && <p className="text-green-500">signup sucessful</p>}
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...loginform}>
              <form
                onSubmit={loginform.handleSubmit(Login)}
                className="space-y-1"
              >
                <FormField
                  control={loginform.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginform.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-800 text-white hover:bg-blue-900"
                  disabled={loading} // Disable button when loading
                >
                  login{/* Display loading state */}
                </Button>
                <CardFooter>
                  {loading && (
                    <div className=" flex flex-row items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-spin"
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                    </div>
                  )}
                  {err && <p className="text-red-500">{err}</p>}
                  {signupstatus && (
                    <p className="text-green-500">signup sucessful</p>
                  )}
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Authform;
