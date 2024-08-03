import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { editprofile, profile, user } from "@/lib/types/user";
import { RootState } from "./store";

interface ProfileState {
  profile: profile;
  user: user;
}

const initialState: ProfileState = {
  profile: {
    id: "",
    description: "",
    date_of_birth: "",
    resume_url: "",
    profile_picture_url: "",
    location: "",
    sociallinks: {
      linkedin: "",
      github: "",
      website: "",
    },
  },
  user: {
    role: "",
    id: "",
    createdDate: "",
    name: "",
    email: "",
    mobile_number: 0,
    updatedDate: "",
  },
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<profile>) => {
      state.profile = action.payload;
    },
    setUser: (state, action: PayloadAction<user>) => {
      state.user = action.payload;
    },
    // editProfile: (state, action: PayloadAction<editprofile>) => {
    //   state.profile = {
    //     ...state,
    //     // action.payload;
    //   }
    // },
    addPhoto: (state, action: PayloadAction<{ url: string }>) => {
      if (state.profile) {
        state.profile.profile_picture_url = action.payload.url;
      }
    },
    addResume: (state, action: PayloadAction<{ url: string }>) => {
      if (state.profile) {
        state.profile.resume_url = action.payload.url;
      }
    },
    clearProfile: (state) => {
      state.profile = initialState.profile;
    },
  },
});

export const { setProfile, clearProfile, addPhoto, addResume, setUser } =
  ProfileSlice.actions;
export const selectuser = (state: RootState) => state.profile.user;
export default ProfileSlice.reducer;
