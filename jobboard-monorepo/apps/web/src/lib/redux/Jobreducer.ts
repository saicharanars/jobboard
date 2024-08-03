import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Job, addJob } from "../types/job";

interface JobState {
  items: Job[];
  editjobdata: Partial<Job>;
  updatebutton: boolean;
  validation: Record<string, string>;
}

const initialState: JobState = {
  items: [],
  editjobdata: {},
  updatebutton: false,
  validation: {},
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    getjobslice: (state, action: PayloadAction<Job[]>) => {
      state.items = action.payload;
    },
    addjobslice: (state, action: PayloadAction<addJob>) => {
      state.items.push(action.payload as Job);
    },
    deletejobslice: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updatejobslice: (state, action: PayloadAction<Job>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    editjobdataslice: (state, action: PayloadAction<Partial<Job>>) => {
      state.editjobdata = action.payload;
    },
    removeeditjobdata: (state) => {
      state.editjobdata = {};
    },
    setupdatebutton: (state) => {
      state.updatebutton = !state.updatebutton;
    },
    setvalidation: (state, action: PayloadAction<Record<string, string>>) => {
      state.validation = action.payload;
    },
  },
});

export const {
  getjobslice,
  addjobslice,
  deletejobslice,
  updatejobslice,
  editjobdataslice,
  removeeditjobdata,
  setupdatebutton,
  setvalidation,
} = jobSlice.actions;

export default jobSlice;
