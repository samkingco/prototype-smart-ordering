import { AppState } from "..";
import { ComputedAccount } from "./slice";

export function getAccount(state: AppState): ComputedAccount {
  return {
    ...state.account,
    hasSetupSmartOrdering: Boolean(
      state.account.hasConfirmedDefaultDeliveryAddress &&
        state.account.hasConfirmedDefaultPaymentMethod &&
        state.account.hasConfirmedMedicines
    ),
  };
}

export function getPatient(state: AppState) {
  const account = getAccount(state);
  return account.patient;
}

export function getDeliveryAddresses(state: AppState) {
  const account = getAccount(state);
  return account.deliveryAddresses;
}

export function getDefaultDeliveryAddress(state: AppState) {
  const addresses = getDeliveryAddresses(state);
  return addresses.find((i) => i.isDefault);
}

export function getPaymentMethods(state: AppState) {
  const account = getAccount(state);
  return account.paymentMethods;
}

export function getDefaultPaymentMethod(state: AppState) {
  const payments = getPaymentMethods(state);
  return payments.find((i) => i.isDefault);
}
