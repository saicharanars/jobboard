"use client"
import Profile from "@/components/sharedcomponents/Profile";
import ProfilePage from "@/components/sharedcomponents/ProfilePage";
import store from "@/lib/redux/profile/store";
import React from "react";
import { Provider } from "react-redux";

const page = () => {
  return (
    <Provider store={store}>
      <ProfilePage />
    </Provider>
  );
};

export default page;
