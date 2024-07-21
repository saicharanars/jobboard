import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profile, user } from "@/lib/types/user";

interface ProfileState {
  profile: profile | null;
  user: user;
}

const initialState: ProfileState = {
  profile: null,
  user: null,
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
      state.profile = null;
    },
  },
});

export const { setProfile, clearProfile, addPhoto, addResume, setUser } =
  ProfileSlice.actions;
export default ProfileSlice.reducer;
