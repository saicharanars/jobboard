import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { addJobApplication, JobApplication } from "@/lib/types/Application";

const initialState = {
  items: [],
  editapplication: {},
};

const applicationslice = createSlice({
  name: "application",
  initialState: initialState,
  reducers: {
    getapplicationslice: (state, action: PayloadAction<JobApplication[]>) => {
      console.log(action);
      return {
        ...state,
        items: action.payload,
      };
    },
    addappliicationslice: (state, action: PayloadAction<addJobApplication>) => {
      console.log(state);
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },
    deleteappliicationslice: (state, action: PayloadAction<{ id: string }>) => {
      console.log(action.payload);
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    },

    updateappliicationslice: (state, action: PayloadAction) => {
      console.log(action.payload);
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    },

    editapplicationslice: (state, action) => {
      return {
        ...state,
        editapplicationdata: action.payload,
      };
    },
    removeeditapplicationdata: (state) => {
      return {
        ...state,
        editapplicationdata: null,
      };
    },
  },
});
export const {
  getapplicationslice,
  addappliicationslice,
  updateappliicationslice,
  deleteappliicationslice,
  setvalidation,
  setupdatebutton,
  removeeditapplicationdata,
  editapplicationslice,
} = applicationslice.actions;
export default applicationslice;
