import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ButtonGroup } from "../../design-system/ButtonGroup";
import { Card } from "../../design-system/Card";
import { DisplayHeading } from "../../design-system/DisplayHeading";
import { Illustration } from "../../design-system/Illustration";
import { LinkButton } from "../../design-system/LinkButton";
import { SecondaryLayout } from "../../design-system/SecondaryLayout";
import { Text } from "../../design-system/Text";
import { enableSmartOrdering } from "../../store/account/slice";

export function AllDone() {
  const dispatch = useDispatch();
  const location = useLocation<{ referrer: Location }>();

  useEffect(() => {
    dispatch(enableSmartOrdering());
  }, [dispatch]);

  return (
    <SecondaryLayout
      flowName="Setup auto ordering"
      currentStep="All done"
      fallbackReturnTo="/account"
    >
      <Card>
        <Illustration src="small-positive" />
        <DisplayHeading size="xl" margin="m 0 s">
          You’ve set up auto ordering
        </DisplayHeading>
        <Text margin="0 0 l">
          That’s all done! Now your chosen medicines will be ordered
          automatically when you run low. Need to change something? You can
          update your auto ordering settings in the{" "}
          <Text isBold isInline>
            Account
          </Text>{" "}
          section.
        </Text>

        <ButtonGroup reverseOrder>
          <LinkButton
            label="Okay, got it"
            linkTo={
              location.state && location.state.referrer
                ? location.state.referrer.pathname
                : "/account/auto-ordering"
            }
          />
        </ButtonGroup>
      </Card>
    </SecondaryLayout>
  );
}
