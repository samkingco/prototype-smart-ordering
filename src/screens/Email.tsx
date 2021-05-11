import { format, subDays } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Card } from "../design-system/Card";
import { Divider } from "../design-system/Divider";
import { EmailLayout } from "../design-system/EmailLayout";
import { Heading } from "../design-system/Heading";
import { Illustration } from "../design-system/Illustration";
import { LinkButton } from "../design-system/LinkButton";
import List from "../design-system/List";
import { MedicineIcon } from "../design-system/MedicineIcon";
import Tag from "../design-system/Tag";
import { Text } from "../design-system/Text";
import TextRow from "../design-system/TextRow";
import {
  getAccount,
  getDefaultDeliveryAddress,
  getDefaultPaymentMethod,
  getPatient,
} from "../store/account/selectors";
import { listNextSmartOrderMedicines } from "../store/medicines/selectors";
import { getMedicineStatusTagProps } from "../utils";

const IllustrationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export function Email() {
  const account = useSelector(getAccount);
  const patient = useSelector(getPatient);
  const medicines = useSelector(listNextSmartOrderMedicines);
  const defaultDeliveryAddress = useSelector(getDefaultDeliveryAddress);
  const defaultPaymentMethod = useSelector(getDefaultPaymentMethod);

  return (
    <EmailLayout>
      <Card>
        <IllustrationWrapper>
          <Illustration src="large-home-delivery" />
        </IllustrationWrapper>

        <Divider />

        <Heading margin="0 0 l" size="xl">
          Your next auto order will be on{" "}
          {format(account.nextSmartOrderDate, "dd MMMM")}
        </Heading>
        <Text margin="0 0 s">Hi {patient.firstName}</Text>
        <Text margin="0 0 s">
          It looks like some of your medicine is running low, which means your
          next auto order is set for{" "}
          {format(account.nextSmartOrderDate, "dd MMMM")}.
        </Text>
        <Text margin="0 0 l">
          If it all looks good, you don’t need to do anything. Or you can change
          or cancel this auto order from your account until{" "}
          {format(subDays(account.nextSmartOrderDate, 1), "dd MMMM")}.
        </Text>
        <LinkButton
          linkTo="/medicine/next-auto-order"
          label="Change or cancel order"
          variant="secondary"
          width="min-content"
        />

        <Divider />

        <Heading margin="0 0 m">Medicine</Heading>
        <List
          margin="m 0 m"
          withDividers={false}
          items={medicines}
          keyExtractor={(i) => i.id}
          renderItem={(medicine) => (
            <TextRow
              title={medicine.name}
              description={medicine.description}
              leading={<MedicineIcon type={medicine.form} />}
              additionalContent={
                <Tag {...getMedicineStatusTagProps(medicine, true)} />
              }
            />
          )}
        />

        {defaultDeliveryAddress ? (
          <>
            <Divider />
            <Heading margin="0 0 m">Delivery address</Heading>
            <Text isBold>
              {patient.firstName} {patient.lastName}
            </Text>
            <Text>{defaultDeliveryAddress.line1}</Text>
            <Text>{defaultDeliveryAddress.city}</Text>
            <Text>{defaultDeliveryAddress.postcode}</Text>
          </>
        ) : null}

        {defaultPaymentMethod ? (
          <>
            <Divider />
            {patient.exemption ? (
              <>
                <Heading margin="0 0 m">Exemption</Heading>
                <TextRow
                  title={patient.exemption.type}
                  description={
                    patient.exemption.expiry &&
                    `Expires ${patient.exemption.expiry}`
                  }
                />
              </>
            ) : (
              <>
                <Heading margin="0 0 m">Payment</Heading>
                <Text margin="0 0 s">
                  {defaultPaymentMethod.type} ending in{" "}
                  <Text isBold isInline>
                    {defaultPaymentMethod.last4}
                  </Text>
                </Text>
                <Text>
                  We’ll take payment when we receive your prescription.
                </Text>
              </>
            )}
          </>
        ) : null}

        <Divider />

        <Text>
          Best wishes
          <br />
          Team Echo
        </Text>
      </Card>
    </EmailLayout>
  );
}
