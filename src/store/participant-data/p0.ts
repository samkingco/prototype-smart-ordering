import { addDays } from "date-fns";
import { Account } from "../account/slice";
import { Medicine } from "../medicines/slice";

const today = new Date();
today.setHours(0, 0, 0, 0);

const account: Account = {
  email: "sam.king@echo.co.uk",
  phone: "07545175929",
  patient: {
    id: "pat_1",
    isAccountHolder: true,
    firstName: "Sam",
    lastName: "King",
  },
  deliveryAddresses: [
    {
      id: "address_1",
      line1: "Flat 5 Walnut Tree Close",
      city: "Guildford",
      postcode: "GU1 3YL",
      isDefault: true,
    },
    {
      id: "address_2",
      line1: "80 Frog Grove Lane",
      city: "Guildford",
      postcode: "GU3 3HE",
    },
  ],
  paymentMethods: [
    // {
    //   id: "payment_1",
    //   type: "Visa",
    //   last4: "4242",
    //   expiry: "02/2022",
    //   isDefault: true,
    // },
    // {
    //   id: "payment_2",
    //   type: "American Express",
    //   last4: "5004",
    //   expiry: "03/2022",
    // },
  ],
  isAutoAskPatientEnabled: true,
  isSmartOrderingEnabled: false,
  hasConfirmedDefaultDeliveryAddress: false,
  hasConfirmedDefaultPaymentMethod: false,
  hasConfirmedMedicines: false,
  nextSmartOrderDate: addDays(today, 3).getTime(),
};

export const medicines: Medicine[] = [
  {
    id: "med_1",
    name: "Paracetamol",
    description: "500mg soluble tablets",
    form: "tablet",
    isSmartOrderingEnabled: true,
    nextDueDate: addDays(today, 10).getTime(),
    lastDeliveredString: "56 tablets delivered 30 March",
  },
  {
    id: "med_2",
    name: "Mirtazapine",
    description: "30mg tablets",
    form: "tablet",
    isSmartOrderingEnabled: true,
    nextDueDate: addDays(today, 11).getTime(),
    lastDeliveredString: "56 tablets delivered 30 March",
  },
  {
    id: "med_3",
    name: "Microgynon 30",
    description: "30microgram capsules",
    form: "capsule",
    isSmartOrderingEnabled: true,
    nextDueDate: addDays(today, 20).getTime(),
    lastDeliveredString: "56 capsules delivered 30 March",
  },
  {
    id: "med_4",
    name: "Salbutamol",
    description: "4mg tablets",
    form: "tablet",
    isSmartOrderingEnabled: true,
    lastDeliveredString: "56 tablets delivered 30 March",
  },
  {
    id: "med_5",
    name: "Omeprazole",
    description: "10mg capsules",
    form: "capsule",
    isSmartOrderingEnabled: true,
    nextDueDate: addDays(today, 12).getTime(),
    lastDeliveredString: "56 capsules delivered 30 March",
  },
];

export default {
  account,
  medicines,
};
