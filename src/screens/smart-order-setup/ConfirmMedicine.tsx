import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "../../design-system/Button";
import { ButtonGroup } from "../../design-system/ButtonGroup";
import { Card } from "../../design-system/Card";
import { DisplayHeading } from "../../design-system/DisplayHeading";
import { Heading } from "../../design-system/Heading";
import { LinkButton } from "../../design-system/LinkButton";
import List from "../../design-system/List";
import { MedicineIcon } from "../../design-system/MedicineIcon";
import OptionRow from "../../design-system/OptionRow";
import { SecondaryLayout } from "../../design-system/SecondaryLayout";
import Tag from "../../design-system/Tag";
import { Text } from "../../design-system/Text";
import TextRow from "../../design-system/TextRow";
import { confirmMedicines } from "../../store/account/slice";
import { listMedicines } from "../../store/medicines/selectors";
import { toggleMedicineSmartOrdering } from "../../store/medicines/slice";
import { getMedicineStatusTagProps } from "../../utils";

export function ConfirmMedicine() {
  const location = useLocation<{ referrer: Location }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const medicines = useSelector(listMedicines);

  const NonPRN = medicines.filter((medicine) => !medicine.isPrn);
  const PRN = medicines.filter((medicine) => medicine.isPrn);

  function onSubmit() {
    dispatch(confirmMedicines());
    history.push(
      "/account/auto-ordering/finished",
      location.state && location.state.referrer
        ? { referrer: location.state.referrer }
        : undefined
    );
  }

  return (
    <SecondaryLayout
      flowName="Setup auto ordering"
      currentStep="Confirm medicine"
      fallbackReturnTo="/account"
    >
      <Card>
        <DisplayHeading size="xl" margin="0 0 s">
          Confirm medicine
        </DisplayHeading>
        <Text margin="0 0 s">
          Choose which medicines to use auto ordering for. We’ll automatically
          order these when they’re running out in 10 days.
        </Text>
        <Text>
          You’ll still be able to order medicine manually, if you need to.
        </Text>

        <List
          margin="l 0"
          withBottomBorder
          withTopBorder
          items={NonPRN}
          keyExtractor={(i) => i.id}
          renderItem={(medicine) => (
            <OptionRow
              selectionMode="switch"
              title={medicine.name}
              description={medicine.description}
              leading={<MedicineIcon type={medicine.form} />}
              checked={medicine.isSmartOrderingEnabled && !medicine.isPrn}
              onChange={() => {
                dispatch(toggleMedicineSmartOrdering({ id: medicine.id }));
              }}
            />
          )}
        />

        {PRN.length > 0 ? (
          <>
            <Heading margin="0 0 s">Medicine without supply details</Heading>
            <Text>
              To use auto ordering for this medicine, you’ll need to tell us how
              much you have left. You can do this from the{" "}
              <Text isInline isBold>
                Medicine
              </Text>{" "}
              section.
            </Text>

            <List
              margin="l 0"
              withTopBorder
              withBottomBorder
              items={PRN}
              keyExtractor={(i) => i.id}
              renderItem={(medicine) => (
                <TextRow
                  title={medicine.name}
                  description={medicine.description}
                  leading={<MedicineIcon type={medicine.form} />}
                />
              )}
            />
          </>
        ) : null}

        <ButtonGroup>
          <Button label="Continue" onClick={onSubmit} />
          <LinkButton
            label="Go back"
            linkTo={
              location.state && location.state.referrer
                ? {
                    pathname: "/account/auto-ordering/confirm-payment",
                    search: location.state.referrer.search,
                    state: { referrer: location.state.referrer },
                  }
                : "/account/auto-ordering/confirm-payment"
            }
            variant="secondary"
          />
        </ButtonGroup>
      </Card>
    </SecondaryLayout>
  );
}
