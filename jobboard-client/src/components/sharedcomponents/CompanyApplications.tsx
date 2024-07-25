"use client";
import { useContext, useEffect } from "react";
import AuthContext from "@/lib/context/auth";
import { DataTable } from "./DataTable";
import { columns } from "./EmployerApplicationsColumns";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetApplicationsEmployerQuery,
  useGetApplicationsQuery,
} from "@/lib/redux/applyjobs/applicationsapi";
import { getapplicationslice } from "@/lib/redux/applyjobs/applicatonreducer";
import store from "@/lib/redux/applyjobs/store";
import { Provider } from "react-redux";
import { LoaderCircle } from "lucide-react";
import AuthCheck from "./Authcheck";
const Applicationsdata = () => {
  const applications = useSelector((state) => state.application.items);
  const authctx = useContext(AuthContext);
  const dispatch = useDispatch();
  const {
    data: applicationsFromApi,
    isLoading,
    error,
  } = useGetApplicationsEmployerQuery({ token: authctx.token });
  useEffect(() => {
    console.log("Fetched Applications from API:", applicationsFromApi); // Add this line
  }, [applicationsFromApi]);

  if (isLoading)
    return (
      <div className="h-full">
        <LoaderCircle
          strokeWidth="3"
          className="text-blue-700 h-8 w-8 m-auto animate-spin"
        />
      </div>
    );
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container  mx-auto py-2  md:py-10">
      <h1 className="text-xl md:text-2xl font-bold  capitalize my-2">
        Applications Received
      </h1>
      <DataTable
        columns={columns}
        data={applicationsFromApi.applications}
        filters={["status"]}
      />
    </div>
  );
};
const CompanyApplications = () => {
  return (
    <Provider store={store}>
      <div className="bg-white rounded-md p-1 md:p-2 m-2">
        <Applicationsdata />
      </div>
    </Provider>
  );
};

export default CompanyApplications;
