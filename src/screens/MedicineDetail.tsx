import React from "react";
import { DeleteIcon } from "@echo-health/icons-web";
import { differenceInDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useParams } from "react-router-dom";
import { Card } from "../design-system/Card";
import { Heading } from "../design-system/Heading";
import { Icon } from "../design-system/Icon";
import LinkRow from "../design-system/LinkRow";
import List from "../design-system/List";
import OptionRow from "../design-system/OptionRow";
import { PageTitle } from "../design-system/PageTitle";
import { PrimaryLayout } from "../design-system/PrimaryLayout";
import { Text } from "../design-system/Text";
import { TextButton } from "../design-system/TextButton";
import TextRow from "../design-system/TextRow";
import { getAccount } from "../store/account/selectors";
import { getMedicine } from "../store/medicines/selectors";
import { toggleMedicineSmartOrdering } from "../store/medicines/slice";

export function MedicineDetail() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { medicineId } = useParams<{ medicineId: string }>();
  const dispatch = useDispatch();
  const account = useSelector(getAccount);
  const medicine = useSelector((s) => getMedicine(s, medicineId));

  if (!medicine) {
    return <Redirect to="/medicine" />;
  }

  const daysLeft =
    medicine.nextDueDate && differenceInDays(medicine.nextDueDate, today);

  return (
    <PrimaryLayout>
      <PageTitle title={medicine.name} subtitle={medicine.description} />
      <Card>
        <Heading margin="0 0 m">Your supply</Heading>
        <TextRow
          title={
            <Text isBold>
              {medicine.isPrn
                ? "Take as required"
                : `${
                    daysLeft && daysLeft <= 0
                      ? "Run out"
                      : `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left`
                  }`}
            </Text>
          }
          description={medicine.lastDeliveredString}
        />
        {medicine.isPrn && !medicine.nextDueDate ? (
          <TextButton
            margin="m 0 0"
            label="Set when you run out"
            onClick={() => {}}
          />
        ) : (
          <TextButton
            margin="m 0 0"
            label="Update supply details"
            onClick={() => {}}
          />
        )}
        {account.isSmartOrderingEnabled && !medicine.isPrn && (
          <List
            margin="l 0 0"
            withTopBorder
            items={[
              <OptionRow
                title="Auto ordering"
                description="Automatically order when running low"
                onChange={() => {
                  dispatch(toggleMedicineSmartOrdering({ id: medicine.id }));
                }}
                checked={medicine.isSmartOrderingEnabled}
                selectionMode="switch"
              />,
            ]}
            keyExtractor={(_, index) => `${index}`}
            renderItem={(item) => item}
          />
        )}
      </Card>

      <Card margin="m 0 0">
        <List
          items={[
            <LinkRow
              title="Remove medicine"
              leading={<Icon type={DeleteIcon} />}
              onClick={() => {}}
            />,
          ]}
          keyExtractor={(_, index) => `${index}`}
          renderItem={(item) => item}
        />
      </Card>
    </PrimaryLayout>
  );
}
