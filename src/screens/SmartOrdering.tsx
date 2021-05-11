import React from "react";
import { Redirect, useLocation } from "react-router";
import { LocationDescriptor } from "history";
import { useDispatch, useSelector } from "react-redux";
import { MoreTimeIcon } from "@echo-health/icons-web";
import { Card } from "../design-system/Card";
import { Icon } from "../design-system/Icon";
import List from "../design-system/List";
import { PageTitle } from "../design-system/PageTitle";
import { PrimaryLayout } from "../design-system/PrimaryLayout";
import { Text } from "../design-system/Text";
import { MedicineIcon } from "../design-system/MedicineIcon";
import { Heading } from "../design-system/Heading";
import OptionRow from "../design-system/OptionRow";
import { TextButton } from "../design-system/TextButton";
import { Divider } from "../design-system/Divider";
import { listMedicines } from "../store/medicines/selectors";
import {
  getAccount,
  getDefaultDeliveryAddress,
  getDefaultPaymentMethod,
} from "../store/account/selectors";
import { toggleSmartOrdering } from "../store/account/slice";
import { toggleMedicineSmartOrdering } from "../store/medicines/slice";
import Tag from "../design-system/Tag";
import { getMedicineStatusTagProps } from "../utils";
import LinkRow from "../design-system/LinkRow";
import TextRow from "../design-system/TextRow";
import PaymentMethodIcon from "../design-system/PaymentMethodIcon";

export function SmartOrdering() {
  const location = useLocation<{ referrer: Location }>();
  const dispatch = useDispatch();
  const medicines = useSelector(listMedicines);
  const defaultDeliveryAddress = useSelector(getDefaultDeliveryAddress);
  const defaultPaymentMethod = useSelector(getDefaultPaymentMethod);

  const NonPRN = medicines.filter((medicine) => !medicine.isPrn);
  const PRN = medicines.filter((medicine) => medicine.isPrn);

  const { isSmartOrderingEnabled, hasSetupSmartOrdering } =
    useSelector(getAccount);

  if (!hasSetupSmartOrdering) {
    const to: LocationDescriptor = {
      pathname: "/account/auto-ordering/setup",
    };

    if (location.state && location.state.referrer) {
      to.search = location.state.referrer.search;
      to.state = { referrer: location.state.referrer };
    }

    return <Redirect to={to} />;
  }

  return (
    <PrimaryLayout>
      <PageTitle title="Auto ordering" fallbackReturnTo="/account" />
      <Card>
        <Text>
          With auto ordering, your next order is placed automatically when your
          medicine runs low. We’ll let you know 2 days before, so you can change
          or cancel if you need to.
        </Text>
        <List
          margin="l 0 0"
          withTopBorder
          items={[{ label: "Auto ordering", icon: MoreTimeIcon }]}
          keyExtractor={(i) => i.label}
          renderItem={(item) => (
            <OptionRow
              selectionMode="switch"
              title={item.label}
              leading={<Icon type={item.icon} />}
              checked={isSmartOrderingEnabled}
              onChange={() => {
                dispatch(toggleSmartOrdering());
              }}
            />
          )}
        />
      </Card>

      <Card margin="m 0 0">
        <Heading margin="0 0 s">Medicines</Heading>
        {NonPRN.length > 0 ? (
          <>
            <Text>Choose which medicines to use auto ordering for.</Text>
            <List
              margin="l 0 0"
              withTopBorder
              withBottomBorder={PRN.length > 0}
              items={NonPRN}
              keyExtractor={(i) => i.id}
              renderItem={(medicine) => (
                <OptionRow
                  selectionMode="switch"
                  title={medicine.name}
                  description={medicine.description}
                  leading={<MedicineIcon type={medicine.form} />}
                  additionalContent={
                    <Tag {...getMedicineStatusTagProps(medicine)} />
                  }
                  checked={
                    medicine.isSmartOrderingEnabled && isSmartOrderingEnabled
                  }
                  onChange={() => {
                    dispatch(toggleMedicineSmartOrdering({ id: medicine.id }));
                  }}
                />
              )}
            />
          </>
        ) : null}

        {PRN.length > 0 ? (
          <>
            <Text margin="l 0 s" isBold>
              Additional setup needed
            </Text>
            <Text>
              If you know when you run out of the following medicine, you can
              update your supply details and use auto ordering later. Just tell
              us how long this medicine usually lasts.
            </Text>

            <List
              margin="l 0 0"
              withTopBorder
              items={PRN}
              keyExtractor={(i) => i.id}
              renderItem={(medicine) => (
                <LinkRow
                  linkTo={{
                    pathname: `/medicine/${medicine.id}`,
                    state: { referrer: location },
                  }}
                  title={medicine.name}
                  description={medicine.description}
                  leading={<MedicineIcon type={medicine.form} />}
                  additionalContent={
                    <Tag {...getMedicineStatusTagProps(medicine)} />
                  }
                />
              )}
            />
          </>
        ) : null}
      </Card>

      {defaultDeliveryAddress && (
        <Card margin="m 0 0">
          <Heading margin="0 0 s">Default delivery address</Heading>
          <Text margin="0 0 m">
            We’ll send auto orders to this address, unless you change it
            manually.
          </Text>
          <Text margin="0 0 m">
            {defaultDeliveryAddress.line1}
            <br />
            {defaultDeliveryAddress.city}
            <br />
            {defaultDeliveryAddress.postcode}
          </Text>
          <TextButton
            label="Change default delivery address"
            onClick={() => {}}
          />
        </Card>
      )}

      {defaultPaymentMethod && (
        <Card margin="m 0 0">
          <Heading margin="0 0 s">Default payment method</Heading>
          <Text margin="0 0 m">
            We’ll use this payment for auto orders, unless you change it
            manually.
          </Text>
          <TextRow
            title={
              <Text>
                {defaultPaymentMethod.type} ending in{" "}
                <Text isInline isBold>
                  {defaultPaymentMethod.last4}
                </Text>
              </Text>
            }
            description={`Expires ${defaultPaymentMethod.expiry}`}
            leading={<PaymentMethodIcon type={defaultPaymentMethod.type} />}
            margin="0 0 m"
          />
          <TextButton
            label="Change default payment method"
            onClick={() => {}}
          />

          <Divider />

          <Text margin="0 0 m" isBold>
            Don’t pay for prescriptions?
          </Text>
          <TextButton
            label="Add exemption or prepayment certificate"
            onClick={() => {}}
          />
        </Card>
      )}
    </PrimaryLayout>
  );
}
