import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteIcon,
  EmailIcon,
  KeyIcon,
  LocalShippingIcon,
  MoreTimeIcon,
  NotificationsIcon,
  PaymentCardIcon,
  PhoneIcon,
  PublishedWithChangesIcon,
  RefreshIcon,
} from "@echo-health/icons-web";
import { Card } from "../design-system/Card";
import { Icon } from "../design-system/Icon";
import List from "../design-system/List";
import { PageTitle } from "../design-system/PageTitle";
import { PrimaryLayout } from "../design-system/PrimaryLayout";
import LinkRow from "../design-system/LinkRow";
import { getAccount } from "../store/account/selectors";
import { DisplayHeading } from "../design-system/DisplayHeading";
import { Avatar } from "../design-system/Avatar";
import { LinkButton } from "../design-system/LinkButton";
import OptionRow from "../design-system/OptionRow";
import {
  reset as resetAccount,
  toggleAutoAskPatient,
} from "../store/account/slice";
import { reset as resetMedicines } from "../store/medicines/slice";
import { useToaster } from "../design-system/Toaster";

export function Account() {
  const location = useLocation<{ referrer: Location }>();
  const dispatch = useDispatch();
  const account = useSelector(getAccount);
  const { notify } = useToaster();

  return (
    <PrimaryLayout>
      <PageTitle
        title="Account"
        mobileIllustration="medium-account"
        desktopIllustration="medium-wide-account"
      />
      <Card>
        <DisplayHeading>Patient information</DisplayHeading>
        <List
          margin="l 0"
          withTopBorder
          withBottomBorder
          items={[account.patient]}
          keyExtractor={(i) => i.id}
          renderItem={(patient) => (
            <LinkRow
              linkTo={`/account/${patient.id}`}
              title={`${patient.firstName} ${patient.lastName}`}
              leading={
                <Avatar name={`${patient.firstName} ${patient.lastName}`} />
              }
            />
          )}
        />
        <LinkButton
          linkTo="/account/new-patient"
          label="Add another person"
          variant="secondary"
          width="min-content"
        />
      </Card>

      <Card margin="m 0 0">
        <DisplayHeading>Settings</DisplayHeading>
        <List
          margin="l 0 0"
          withTopBorder
          items={[
            <LinkRow
              title="Auto ordering"
              description="Set up automatic ordering for when your medicine runs low"
              leading={<Icon type={MoreTimeIcon} />}
              linkTo={{
                pathname: "/account/auto-ordering",
                state: { referrer: location },
              }}
            />,
            <OptionRow
              title="Don’t ask for confirmation of new medicines"
              description="We’ll automatically send you everything your GP prescribes"
              leading={<Icon type={PublishedWithChangesIcon} />}
              selectionMode="switch"
              onChange={() => {
                dispatch(toggleAutoAskPatient());
              }}
              checked={account.isAutoAskPatientEnabled}
            />,
            <LinkRow
              title="Payment"
              description="Choose how you want to pay"
              leading={<Icon type={PaymentCardIcon} />}
              linkTo="/account/payment"
            />,
            <LinkRow
              title="Delivery and collection"
              description="Choose how you want to receive your medicine"
              leading={<Icon type={LocalShippingIcon} />}
              linkTo="/account/delivery-addresses"
            />,
            <LinkRow
              title="Notifications"
              description="Control how you want to be notified"
              leading={<Icon type={NotificationsIcon} />}
              linkTo="/account/notifications"
            />,
          ]}
          keyExtractor={(_, index) => `${index}`}
          renderItem={(item) => item}
        />
      </Card>

      <Card margin="m 0 0">
        <DisplayHeading>Account details</DisplayHeading>
        <List
          margin="l 0 0"
          withTopBorder
          items={[
            <LinkRow
              title={account.email}
              description="Change your email address"
              leading={<Icon type={EmailIcon} />}
              linkTo="/account/email"
            />,
            <LinkRow
              title={account.phone}
              description="Change your phone number"
              leading={<Icon type={PhoneIcon} />}
              linkTo="/account/phone"
            />,
            <LinkRow
              title="Change your password"
              leading={<Icon type={KeyIcon} />}
              linkTo="/account/password"
            />,
            <LinkRow
              title="Delete account"
              leading={<Icon type={DeleteIcon} />}
              onClick={() => {}}
            />,
          ]}
          keyExtractor={(_, index) => `${index}`}
          renderItem={(item) => item}
        />
      </Card>

      <Card margin="m 0 0">
        <DisplayHeading>Legal</DisplayHeading>
        <List
          margin="l 0 0"
          withTopBorder
          items={[
            <LinkRow title="Terms and conditions" linkTo="/account/terms" />,
            <LinkRow title="Privacy policy" linkTo="/account/privacy" />,
            <LinkRow
              title="Understanding electronic prescriptions"
              linkTo="/account/eps"
            />,
            <LinkRow title="About Echo" linkTo="/account/about" />,
          ]}
          keyExtractor={(_, index) => `${index}`}
          renderItem={(item) => item}
        />
      </Card>

      <Card margin="m 0 0">
        <DisplayHeading>Prototype</DisplayHeading>
        <List
          margin="l 0 0"
          withTopBorder
          items={[
            <LinkRow
              title="View auto order email"
              leading={<Icon type={EmailIcon} />}
              linkTo={{
                pathname: "/email",
              }}
            />,
            <LinkRow
              title="Reset prototype"
              leading={<Icon type={RefreshIcon} />}
              onClick={() => {
                dispatch(resetAccount());
                dispatch(resetMedicines());
                notify("Prototype reset", {
                  variant: "success",
                });
              }}
            />,
          ]}
          keyExtractor={(_, index) => `${index}`}
          renderItem={(item) => item}
        />
      </Card>
    </PrimaryLayout>
  );
}
