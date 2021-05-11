import { CalendarTodayIcon, MoreTimeIcon } from "@echo-health/icons-web";
import { format, subDays } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Card } from "../design-system/Card";
import { DisplayHeading } from "../design-system/DisplayHeading";
import { Icon } from "../design-system/Icon";
import { LinkButton } from "../design-system/LinkButton";
import LinkRow from "../design-system/LinkRow";
import List from "../design-system/List";
import { MedicineIcon } from "../design-system/MedicineIcon";
import { PageTitle } from "../design-system/PageTitle";
import { PrimaryLayout } from "../design-system/PrimaryLayout";
import Tag from "../design-system/Tag";
import { Text } from "../design-system/Text";
import { Tooltip } from "../design-system/Tooltip";
import { getAccount } from "../store/account/selectors";
import {
  listMedicines,
  listNextSmartOrderMedicines,
} from "../store/medicines/selectors";
import { getMedicineStatusTagProps } from "../utils";

export function Medicine() {
  const location = useLocation();
  const account = useSelector(getAccount);
  const medicines = useSelector(listMedicines);
  const autoOrderMedicines = useSelector(listNextSmartOrderMedicines);
  const { hasSetupSmartOrdering, isSmartOrderingEnabled } =
    useSelector(getAccount);

  return (
    <PrimaryLayout>
      <PageTitle
        title="Medicine"
        desktopIllustration="medium-wide-medicine"
        mobileIllustration="medium-medicine"
      />
      {!hasSetupSmartOrdering && (
        <Card margin="0 0 m">
          <Tag label="New feature" variant="success" margin="0 0 s" />
          <DisplayHeading margin="0 0 s">
            Order without lifting a finger
          </DisplayHeading>
          <Text margin="0 0 l">
            Turn on auto ordering and when your medicine runs low, we’ll
            automatically place your next order. We’ll let you know 2 days
            before so you can change or cancel if you need to.
          </Text>
          <LinkButton
            label="Turn on auto ordering"
            linkTo={{
              pathname: "/account/auto-ordering",
              state: { referrer: location },
            }}
            width="min-content"
          />
        </Card>
      )}

      <Card>
        <List
          items={[
            isSmartOrderingEnabled && autoOrderMedicines.length > 0 && (
              <LinkRow
                linkTo={{
                  pathname: "/medicine/next-auto-order",
                  state: { referrer: location },
                }}
                title="Your next auto order"
                description={`You can make changes until ${format(
                  subDays(account.nextSmartOrderDate, 1),
                  "dd MMMM"
                )}`}
                leading={<Icon type={MoreTimeIcon} />}
              />
            ),
            <LinkRow
              linkTo="/medicine/today"
              title="Today’s medicines"
              description="See what you need to take today"
              leading={<Icon type={CalendarTodayIcon} />}
            />,
          ]}
          keyExtractor={(_, index) => `${index}`}
          renderItem={(item) => item}
        />
      </Card>

      <Card margin="m 0 0">
        <DisplayHeading>Your medicines</DisplayHeading>
        <List
          margin="l 0 l"
          withTopBorder
          withBottomBorder
          items={medicines}
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
        <Tooltip content="wow">
          <LinkButton
            linkTo="/medicine/add"
            label="Add medicine"
            variant="secondary"
            width="min-content"
          />
        </Tooltip>
      </Card>

      <Card margin="m 0 0">
        <List
          items={[
            <LinkRow
              linkTo="/medicine/history"
              title="Order history"
              description="View your previous orders"
            />,
          ]}
          keyExtractor={(_, index) => `${index}`}
          renderItem={(item) => item}
        />
      </Card>
    </PrimaryLayout>
  );
}
