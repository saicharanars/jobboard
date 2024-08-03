import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddJobApplication, JobApplication } from "@/lib/types/Application";

interface ApplicationState {
  items: JobApplication[];
  editApplicationData: JobApplication | null;
}

const initialState: ApplicationState = {
  items: [],
  editApplicationData: null,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    getApplications: (state, action: PayloadAction<JobApplication[]>) => {
      state.items = action.payload;
    },
    addApplication: (state, action: PayloadAction<AddJobApplication>) => {
      state.items.push(action.payload  as JobApplication);
    },
    deleteApplication: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateApplication: (state, action: PayloadAction<JobApplication>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setEditApplication: (state, action: PayloadAction<JobApplication>) => {
      state.editApplicationData = action.payload;
    },
    clearEditApplication: (state) => {
      state.editApplicationData = null;
    },
  },
});

export const {
  getApplications,
  addApplication,
  updateApplication,
  deleteApplication,
  setEditApplication,
  clearEditApplication,
} = applicationSlice.actions;

export default applicationSlice.reducer;
