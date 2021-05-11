import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uuid } from "../../utils";
import participant from "../participant-data/p0";

const initialState = participant.account;

export interface Address {
  id: string;
  name?: string;
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  phone?: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: "Visa" | "Mastercard" | "American Express";
  last4: string;
  expiry: string;
  isDefault?: boolean;
}

export interface Exemption {
  type: string;
  expiry?: string;
}

export interface Patient {
  id: string;
  isAccountHolder?: boolean;
  firstName: string;
  lastName: string;
  exemption?: Exemption;
}

export interface Account {
  email: string;
  phone: string;
  patient: Patient;
  deliveryAddresses: Address[];
  paymentMethods: PaymentMethod[];
  isAutoAskPatientEnabled: boolean;
  isSmartOrderingEnabled: boolean;
  hasConfirmedDefaultDeliveryAddress: boolean;
  hasConfirmedDefaultPaymentMethod: boolean;
  hasConfirmedMedicines: boolean;
  nextSmartOrderDate: number;
}

export interface ComputedAccount extends Account {
  hasSetupSmartOrdering: boolean;
}

export const { actions, reducer } = createSlice({
  name: "account",
  initialState,
  reducers: {
    reset: () => initialState,
    toggleAutoAskPatient: (state) => {
      state.isAutoAskPatientEnabled = !state.isAutoAskPatientEnabled;
    },
    toggleSmartOrdering: (state) => {
      state.isSmartOrderingEnabled = !state.isSmartOrderingEnabled;
    },
    enableSmartOrdering: (state) => {
      state.isSmartOrderingEnabled = true;
    },
    confirmDefaultDeliveryAddress: (state) => {
      state.hasConfirmedDefaultDeliveryAddress = true;
    },
    confirmDefaultPaymentMethod: (state) => {
      state.hasConfirmedDefaultPaymentMethod = true;
    },
    confirmMedicines: (state) => {
      state.hasConfirmedMedicines = true;
    },
    setDefaultDeliveryAddress: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      state.deliveryAddresses = state.deliveryAddresses.map((i) => ({
        ...i,
        isDefault: i.id === action.payload.id,
      }));
    },
    setDefaultPaymentMethod: (state, action: PayloadAction<{ id: string }>) => {
      state.paymentMethods = state.paymentMethods.map((i) => ({
        ...i,
        isDefault: i.id === action.payload.id,
      }));
    },
    addPaymentMethod: (
      state,
      action: PayloadAction<Omit<PaymentMethod, "id">>
    ) => {
      const id = uuid();
      state.paymentMethods = [
        ...state.paymentMethods,
        { id, ...action.payload },
      ];
    },
  },
});

export const {
  reset,
  toggleAutoAskPatient,
  toggleSmartOrdering,
  enableSmartOrdering,
  confirmDefaultDeliveryAddress,
  confirmDefaultPaymentMethod,
  confirmMedicines,
  setDefaultDeliveryAddress,
  setDefaultPaymentMethod,
  addPaymentMethod,
} = actions;
