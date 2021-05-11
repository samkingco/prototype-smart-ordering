import { differenceInDays, format } from "date-fns";
import { TagProps } from "./design-system/Tag";
import { ComputedMedicine } from "./store/medicines/slice";

export function overflowString(string: string, maxLength: number) {
  return string.length > maxLength
    ? `${string.slice(0, maxLength - 2)}…`
    : string;
}

export function sortByKey<T>(key: keyof T, orderDesc = false) {
  return function (a: T, b: T) {
    if (orderDesc) {
      return a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0;
    }
    return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
  };
}

export function getMedicineStatusTagProps(
  medicine: ComputedMedicine,
  showActualDates?: boolean
) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tagProps: TagProps = {
    variant: "info",
    label: "Take as required",
  };

  if (medicine.nextDueDate) {
    if (showActualDates) {
      tagProps.label = `Runs out ${format(medicine.nextDueDate, "d MMM")}`;
    } else {
      tagProps.label = `Runs out in ${differenceInDays(
        medicine.nextDueDate,
        today
      )} days`;
    }
  }

  if (medicine.isRequestable) {
    tagProps.variant = "warning";
  }

  if (medicine.hasRunOut) {
    tagProps.label = "Run out";
    tagProps.variant = "error";
  }

  return tagProps;
}

export function uuid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).substr(2, 32)}`;
}
