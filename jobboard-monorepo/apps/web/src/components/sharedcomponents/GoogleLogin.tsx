"use client";

import React from "react";
import { Button } from "../ui/button";

// Define types for user and error

const GoogleLogin: React.FC = () => {
  // const url = "http://localhost:3001/";
  const url = "https://jobboard-4945.onrender.com/";

  const handleGoogleLogin = () => {
    window.location.href = `${url}auth/google`;
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      variant={"outline"}
      className="flex justify-center rounded-md  border-2 border-blue-500 gap-1 w-full"
    >
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.6711 8.36824H17.9998V8.33366H10.4998V11.667H15.2094C14.5223 13.6074 12.6761 15.0003 10.4998 15.0003C7.73859 15.0003 5.49984 12.7616 5.49984 10.0003C5.49984 7.23908 7.73859 5.00033 10.4998 5.00033C11.7744 5.00033 12.934 5.48116 13.8169 6.26658L16.174 3.90949C14.6857 2.52241 12.6948 1.66699 10.4998 1.66699C5.89775 1.66699 2.1665 5.39824 2.1665 10.0003C2.1665 14.6024 5.89775 18.3337 10.4998 18.3337C15.1019 18.3337 18.8332 14.6024 18.8332 10.0003C18.8332 9.44158 18.7757 8.89616 18.6711 8.36824Z"
          fill="#FFC107"
        />
        <path
          d="M3.12744 6.12158L5.86536 8.12949C6.60619 6.29533 8.40036 5.00033 10.4999 5.00033C11.7745 5.00033 12.9341 5.48116 13.817 6.26658L16.1741 3.90949C14.6858 2.52241 12.6949 1.66699 10.4999 1.66699C7.29911 1.66699 4.52327 3.47408 3.12744 6.12158Z"
          fill="#FF3D00"
        />
        <path
          d="M10.4998 18.3336C12.6523 18.3336 14.6081 17.5099 16.0869 16.1703L13.5077 13.9878C12.6429 14.6454 11.5862 15.0011 10.4998 15.0003C8.3323 15.0003 6.49189 13.6182 5.79855 11.6895L3.08105 13.7832C4.46022 16.482 7.26105 18.3336 10.4998 18.3336Z"
          fill="#4CAF50"
        />
        <path
          d="M18.6713 8.36759H18V8.33301H10.5V11.6663H15.2096C14.8809 12.5898 14.2889 13.3968 13.5067 13.9876L13.5079 13.9868L16.0871 16.1693C15.9046 16.3351 18.8333 14.1663 18.8333 9.99967C18.8333 9.44092 18.7758 8.89551 18.6713 8.36759Z"
          fill="#1976D2"
        />
      </svg>
      Google
    </Button>
  );
};

export default GoogleLogin;
