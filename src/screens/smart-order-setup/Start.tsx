import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ButtonGroup } from "../../design-system/ButtonGroup";
import { Card } from "../../design-system/Card";
import { DisplayHeading } from "../../design-system/DisplayHeading";
import { Divider } from "../../design-system/Divider";
import { Illustration } from "../../design-system/Illustration";
import { LinkButton } from "../../design-system/LinkButton";
import { SecondaryLayout } from "../../design-system/SecondaryLayout";
import { Text } from "../../design-system/Text";
import { getAccount } from "../../store/account/selectors";

export function Start() {
  const location = useLocation<{ referrer: Location }>();
  const { isSmartOrderingEnabled, hasSetupSmartOrdering } =
    useSelector(getAccount);

  // If has already set delivery method, redirect to payment

  let content = null;

  if (hasSetupSmartOrdering || isSmartOrderingEnabled) {
    content = (
      <Card>
        <Illustration src="small-positive" />
        <DisplayHeading size="xl" margin="m 0 s">
          Auto ordering is already set up
        </DisplayHeading>
        <Text margin="0 0 l">
          You don't have to do anything, we'll send your medicine when it starts
          to run low.
        </Text>
        <ButtonGroup reverseOrder>
          <LinkButton linkTo="/medicine" label="Okay, got it" />
        </ButtonGroup>
      </Card>
    );
  } else {
    content = (
      <Card>
        <DisplayHeading size="xl" margin="0 0 s">
          Ready to set up auto ordering?
        </DisplayHeading>
        <Text>
          We’ll need to confirm a default address and payment method to use for
          your auto orders. You can also choose which medicines you want to set
          it up for.
        </Text>
        <Divider />
        <ButtonGroup>
          <LinkButton
            label="Get started"
            linkTo={
              location.state && location.state.referrer
                ? {
                    pathname: "/account/auto-ordering/confirm-address",
                    search: location.state.referrer.search,
                    state: { referrer: location.state.referrer },
                  }
                : "/account/auto-ordering/confirm-address"
            }
          />
          <LinkButton
            label="Go back"
            linkTo={
              location.state && location.state.referrer
                ? {
                    pathname: location.state.referrer.pathname,
                    search: location.state.referrer.search,
                  }
                : "/account"
            }
            variant="secondary"
          />
        </ButtonGroup>
        {/* Pass on location.state.referrer */}
      </Card>
    );
  }

  return (
    <SecondaryLayout
      flowName="Setup auto ordering"
      currentStep="Start"
      fallbackReturnTo="/account"
    >
      {content}
    </SecondaryLayout>
  );
}
