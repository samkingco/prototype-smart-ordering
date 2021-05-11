import { addDays, isBefore, isPast } from "date-fns";
import { AppState } from "..";
import { sortByKey } from "../../utils";
import { ComputedMedicine, Medicine } from "./slice";

export function listMedicines(state: AppState): ComputedMedicine[] {
  return Object.keys(state.medicines)
    .map((id) => {
      const medicine = state.medicines[id];
      const requestDate = addDays(new Date(), 10);
      const autoOrderDate = addDays(new Date(), 12);

      return {
        ...medicine,
        isPrn: Boolean(!medicine.nextDueDate),
        isRequestable: Boolean(
          medicine.nextDueDate && isBefore(medicine.nextDueDate, requestDate)
        ),
        isSmartOrderable: Boolean(
          medicine.isSmartOrderingEnabled &&
            medicine.nextDueDate &&
            isBefore(medicine.nextDueDate, autoOrderDate)
        ),
        hasRunOut: Boolean(
          medicine.nextDueDate && isPast(medicine.nextDueDate)
        ),
      };
    })
    .sort(sortByKey<Medicine>("id"));
}

export function listNextSmartOrderMedicines(state: AppState) {
  const medicines = listMedicines(state);
  return medicines.filter((i) => i.isSmartOrderable);
}

export function getMedicine(state: AppState, id: string) {
  const medicines = listMedicines(state);
  const medicine = medicines.find((i) => i.id === id);
  return medicine;
}
