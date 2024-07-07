import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useState } from "react";
import { addJob, Job } from "../types/job";

const initialState = {
  items: [],
  editjobdata: {},
  updatebutton: false,
  validation: {},
};

const jobslice = createSlice({
  name: "job",
  initialState: initialState,
  reducers: {
    getjobslice: (state, action: PayloadAction<Job[]>) => {
      console.log(action);
      return {
        ...state,
        items: action.payload,
      };
    },
    addjobslice: (state, action: PayloadAction<addJob>) => {
      console.log(state);
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },
    deletejobslice: (state, action: PayloadAction<{ id: string }>) => {
      console.log(action.payload);
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    },

    updatejobslice: (state, action: PayloadAction) => {
      console.log(action.payload);
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    },

    editjobdataslice: (state, action) => {
      return {
        ...state,
        editjobdata: action.payload,
      };
    },
    removeeditjobdata: (state) => {
      return {
        ...state,
        editjobdata: null,
      };
    },

    setupdatebutton: (state) => {
      return {
        ...state,
        updatebutton: !state.updatebutton,
      };
    },

    setvalidation: (state, action) => {
      return {
        validation: action.payload,
      };
    },
  },
});
export const {
  editjobdataslice,
  getjobslice,
  addjobslice,
  updatejobslice,
  removeeditjobdata,
  setupdatebutton,
  deletejobslice,
  setvalidation,
} = jobslice.actions;
export default jobslice;
