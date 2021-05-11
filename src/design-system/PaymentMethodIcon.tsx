import React from "react";
import Mastercard from "./payment-icons/Mastercard";
import Visa from "./payment-icons/Visa";
import Amex from "./payment-icons/Amex";
import CreditCard from "./payment-icons/CreditCard";
import { WithMarginProp } from "../styled/withMargin";
import { Icon } from "./Icon";

type IconSize = "xl" | "l" | "m" | "s";

type Props = WithMarginProp & {
  type?: string | null;
  size?: IconSize;
};

const PaymentMethodIcon = (props: Props) => {
  const size = { width: 40, height: 24 };

  switch (props.type) {
    case "MasterCard":
      return <Icon margin={props.margin} type={Mastercard} customSize={size} />;
    case "Amex":
    case "American Express":
      return <Icon margin={props.margin} type={Amex} customSize={size} />;
    case "Visa":
      return <Icon margin={props.margin} type={Visa} customSize={size} />;
    default:
      return <Icon margin={props.margin} type={CreditCard} customSize={size} />;
  }
};

export default PaymentMethodIcon;
