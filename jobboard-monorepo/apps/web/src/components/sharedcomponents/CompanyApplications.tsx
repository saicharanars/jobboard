import { useContext, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { LoaderCircle } from "lucide-react";
import AuthContext from "@/lib/context/auth";
import { DataTable } from "./DataTable";
import { columns } from "./EmployerApplicationsColumns";
import { useGetApplicationsEmployerQuery } from "@/lib/redux/applyjobs/applicationsapi";
import store from "@/lib/redux/applyjobs/store";
import { EmployerApplications, JobApplication } from "@/lib/types/Application";

// Define the shape of your Redux store
interface RootState {
  application: {
    items: EmployerApplications[];
    editApplicationData: EmployerApplications | null;
  };
}

const Applicationsdata: React.FC = () => {
  const applications = useSelector(
    (state: RootState) => state.application.items
  );
  const authctx = useContext(AuthContext);
  const dispatch = useDispatch();

  const {
    data: applicationsFromApi,
    isLoading,
    error,
  } = useGetApplicationsEmployerQuery({ token: authctx.token });

  useEffect(() => {
    console.log("Fetched Applications from API:", applicationsFromApi);
    // dispatch(applications(applicationsFromApi))
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

  if (error) return <div>An error occurred: {JSON.stringify(error)}</div>;

  // Transform the API data to match EmployerApplications type
  //   const transformedData: EmployerApplications[] = (applicationsFromApi || []).map(app => ({
  //   resume_url: app.resume_url || '',
  //   answers: app.answers || [],
  //   createdDate: app.createdDate || '',
  //   status: app.status || '',
  //   id: app.id || '',
  //   job: {
  //     id: app.job?.id || '',
  //     job_role: app.job?.job_role || '',
  //     category: app.job?.category || '',
  //     questions: app.job?.questions || [],
  //   },
  //   user: {
  //     id: app.user?.id || '',
  //     name: app.user?.name || '',
  //     email: app.user?.email || '',
  //     mobile_number: app.user?.mobile_number || 0,
  //   },
  // }));

  return (
    <div className="container mx-auto py-2 md:py-10">
      <h1 className="text-xl md:text-2xl font-bold capitalize my-2">
        Applications Received
      </h1>
      {applicationsFromApi && (
        <DataTable
          columns={columns}
          data={applicationsFromApi.applications}
          // filters={["status"]}
        />
      )}
    </div>
  );
};

const CompanyApplications: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="bg-white rounded-md p-1 md:p-2 m-2">
        <Applicationsdata />
      </div>
    </Provider>
  );
};

export default CompanyApplications;
