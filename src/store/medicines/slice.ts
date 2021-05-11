import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import participant from "../participant-data/p0";

const { medicines } = participant;
const initialState: { [key: string]: Medicine } = medicines.reduce(
  (state, medicine) => {
    return {
      ...state,
      [medicine.id]: medicine,
    };
  },
  {}
);

export type MedicineForm =
  | "bottle"
  | "capsule"
  | "dressing"
  | "drop"
  | "inhaler"
  | "needle"
  | "syringe"
  | "patch"
  | "sachet"
  | "spray"
  | "stocking"
  | "test-strip"
  | "tablet"
  | "tub"
  | "tube-cylinder"
  | "unknown";

export interface Medicine {
  id: string;
  name: string;
  description: string;
  form: MedicineForm;
  isSmartOrderingEnabled: boolean;
  nextDueDate?: number;
  lastDeliveredString?: string;
}

export interface ComputedMedicine extends Medicine {
  isPrn: boolean;
  isRequestable: boolean;
  isSmartOrderable: boolean;
  hasRunOut: boolean;
}

export const { actions, reducer } = createSlice({
  name: "medicines",
  initialState,
  reducers: {
    reset: () => initialState,
    toggleMedicineSmartOrdering: (
      state,
      action: PayloadAction<{ id: Medicine["id"] }>
    ) => {
      state[action.payload.id].isSmartOrderingEnabled =
        !state[action.payload.id].isSmartOrderingEnabled;
    },
    updateDueDate: (
      state,
      action: PayloadAction<{
        id: Medicine["id"];
        nextDueDate: Medicine["nextDueDate"];
      }>
    ) => {
      state[action.payload.id].nextDueDate = action.payload.nextDueDate;
    },
  },
});

export const { reset, toggleMedicineSmartOrdering, updateDueDate } = actions;
