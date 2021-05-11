import React, { useState } from "react";
import { addDays, format, subDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../design-system/Card";
import Disclosure from "../design-system/Disclosure";
import { Divider } from "../design-system/Divider";
import { Heading } from "../design-system/Heading";
import List from "../design-system/List";
import { MedicineIcon } from "../design-system/MedicineIcon";
import { MenuButton } from "../design-system/MenuButton";
import { Modal } from "../design-system/Modal";
import { PageTitle } from "../design-system/PageTitle";
import PaymentMethodIcon from "../design-system/PaymentMethodIcon";
import { PrimaryLayout } from "../design-system/PrimaryLayout";
import Tag from "../design-system/Tag";
import { Text } from "../design-system/Text";
import { TextButton } from "../design-system/TextButton";
import { TextInput } from "../design-system/TextInput";
import TextRow from "../design-system/TextRow";
import {
  getAccount,
  getDefaultDeliveryAddress,
  getDefaultPaymentMethod,
  getPatient,
} from "../store/account/selectors";
import { listNextSmartOrderMedicines } from "../store/medicines/selectors";
import { ComputedMedicine, updateDueDate } from "../store/medicines/slice";
import { getMedicineStatusTagProps } from "../utils";
import { ButtonGroup } from "../design-system/ButtonGroup";
import { Button } from "../design-system/Button";

export function NextSmartOrder() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dispatch = useDispatch();
  const account = useSelector(getAccount);
  const patient = useSelector(getPatient);
  const medicines = useSelector(listNextSmartOrderMedicines);
  const defaultDeliveryAddress = useSelector(getDefaultDeliveryAddress);
  const defaultPaymentMethod = useSelector(getDefaultPaymentMethod);

  const [IDNTYMedicine, setIDNTYMedicine] =
    useState<ComputedMedicine | undefined>();

  const [updatedDueDate, setUpdatedDueDate] = useState("");
  const newDueDate = updatedDueDate ? parseInt(updatedDueDate, 10) : 0;

  return (
    <PrimaryLayout>
      <PageTitle title="Your next auto order" fallbackReturnTo="/medicine" />
      <Card>
        <Text margin="0 0 s">
          It looks like some of your medicine is running low, which means your
          next auto order is set for{" "}
          <Text isBold isInline>
            {format(account.nextSmartOrderDate, "dd MMMM")}
          </Text>
          .
        </Text>
        <Text margin="0 0 l">
          If it all looks good, you don’t need to do anything. Or you can change
          or cancel this auto order until{" "}
          <Text isBold isInline>
            {format(subDays(account.nextSmartOrderDate, 1), "dd MMMM")}
          </Text>
          .
        </Text>

        <TextButton label="Cancel order" onClick={() => {}} isDestructive />
      </Card>

      <Card margin="m 0 0">
        <Heading>Medicines</Heading>
        <List
          margin="m 0"
          withTopBorder
          withBottomBorder
          items={medicines}
          keyExtractor={(i) => i.id}
          renderItem={(medicine) => (
            <TextRow
              title={medicine.name}
              description={medicine.description}
              leading={<MedicineIcon type={medicine.form} />}
              trailing={
                <MenuButton
                  align="right"
                  label="See options"
                  options={[
                    {
                      label: "I need this sooner",
                      onClick: () => {},
                    },
                    {
                      label: "I don’t need this yet",
                      onClick: () => {
                        setIDNTYMedicine(medicine);
                      },
                    },
                  ]}
                />
              }
              additionalContent={
                <Tag {...getMedicineStatusTagProps(medicine)} />
              }
            />
          )}
        />
        <Disclosure title="Can’t see all your medicine?" margin="-s 0">
          <Text margin="0 0 m">
            Some of your medicine might not be ready to order yet. You can add
            it to this auto order, but your GP might not prescribe it if it’s
            too early.
          </Text>
          <TextButton label="Add medicine to this order" onClick={() => {}} />
        </Disclosure>
      </Card>

      {defaultDeliveryAddress ? (
        <Card margin="m 0 0">
          <Heading margin="0 0 m">Delivery address</Heading>
          <Text isBold>
            {patient.firstName} {patient.lastName}
          </Text>
          <Text>{defaultDeliveryAddress.line1}</Text>
          <Text>{defaultDeliveryAddress.city}</Text>
          <Text margin="0 0 m">{defaultDeliveryAddress.postcode}</Text>
          <TextButton label="Change delivery method" onClick={() => {}} />
        </Card>
      ) : null}

      {patient.exemption ? (
        <Card margin="m 0 0">
          <Heading margin="0 0 m">Exemption</Heading>
          <TextRow
            title={patient.exemption.type}
            description={
              patient.exemption.expiry && `Expires ${patient.exemption.expiry}`
            }
          />
        </Card>
      ) : null}

      {defaultPaymentMethod && !patient.exemption ? (
        <Card margin="m 0 0">
          <Heading margin="0 0 m">Payment</Heading>
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
          <Text margin="0 0 m">
            We’ll automatically charge this card when we receive your
            prescription.
          </Text>
          <TextButton
            label="Change payment method"
            onClick={() => {}}
            margin="0 0 l"
          />
          <Text margin="0 0 m" isBold>
            Don’t pay for prescriptions?
          </Text>
          <TextButton
            label="Add exemption or prepayment certificate"
            onClick={() => {}}
          />
        </Card>
      ) : null}

      <Modal
        title="I don’t need this yet"
        isOpen={Boolean(IDNTYMedicine)}
        onClose={() => {
          setIDNTYMedicine(undefined);
        }}
      >
        {IDNTYMedicine && (
          <>
            <Text isBold margin="0 0 m">
              How long will your supply of this medicine last?
            </Text>
            <TextInput
              label="Number of days left"
              name="days-left"
              value={updatedDueDate}
              onChange={(e) => setUpdatedDueDate(e.currentTarget.value)}
            />
            <Divider />
            {newDueDate && newDueDate > 10 ? (
              <Text margin="0 0 m">
                Your next auto order for this medicine will be on{" "}
                {format(addDays(today, newDueDate - 10), "d MMMM")}.
              </Text>
            ) : null}
            <TextRow
              title={IDNTYMedicine.name}
              description={IDNTYMedicine.description}
              leading={<MedicineIcon type={IDNTYMedicine.form} />}
              additionalContent={
                <Tag
                  {...(newDueDate
                    ? {
                        label: `Runs out in ${newDueDate} ${
                          newDueDate === 1 ? "day" : "days"
                        }`,
                        variant: newDueDate > 10 ? "info" : "warning",
                      }
                    : getMedicineStatusTagProps(IDNTYMedicine))}
                />
              }
            />
            <Divider />
            <ButtonGroup>
              <Button
                label="Update supply"
                onClick={() => {
                  dispatch(
                    updateDueDate({
                      id: IDNTYMedicine.id,
                      nextDueDate: addDays(today, newDueDate).getTime(),
                    })
                  );
                  setUpdatedDueDate("");
                  setIDNTYMedicine(undefined);
                }}
              />
              <Button
                label="Go back"
                onClick={() => {
                  setIDNTYMedicine(undefined);
                }}
                variant="secondary"
              />
            </ButtonGroup>
          </>
        )}
      </Modal>
    </PrimaryLayout>
  );
}
