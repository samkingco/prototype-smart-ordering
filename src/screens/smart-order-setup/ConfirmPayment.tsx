import { AddIcon } from "@echo-health/icons-web";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Banner } from "../../design-system/Banner";
import { Button } from "../../design-system/Button";
import { ButtonGroup } from "../../design-system/ButtonGroup";
import { Card } from "../../design-system/Card";
import { DisplayHeading } from "../../design-system/DisplayHeading";
import { Divider } from "../../design-system/Divider";
import { LinkButton } from "../../design-system/LinkButton";
import { OptionsGroup } from "../../design-system/OptionsGroup";
import { SecondaryLayout } from "../../design-system/SecondaryLayout";
import Tag from "../../design-system/Tag";
import { Text } from "../../design-system/Text";
import { TextButton } from "../../design-system/TextButton";
import { TextInput } from "../../design-system/TextInput";
import {
  getDefaultDeliveryAddress,
  getDefaultPaymentMethod,
  getPatient,
  getPaymentMethods,
} from "../../store/account/selectors";
import {
  addPaymentMethod,
  confirmDefaultPaymentMethod,
  setDefaultPaymentMethod,
} from "../../store/account/slice";

export function ConfirmPayment() {
  const location = useLocation<{ referrer: Location }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const patient = useSelector(getPatient);
  const paymentMethods = useSelector(getPaymentMethods);
  const defaultPaymentMethod = useSelector(getDefaultPaymentMethod);
  const defaultDeliveryAddress = useSelector(getDefaultDeliveryAddress);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    defaultPaymentMethod && defaultPaymentMethod.id
  );
  const [showNewCard, setShowNewCard] = useState(false);
  const [cardName, setCardName] = useState(
    `${patient.firstName} ${patient.lastName}`
  );
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardExpiry, setCardExpiry] = useState("02/22");
  const [cardSecurity, setCardSecurity] = useState("123");
  const [cardPostcode, setCardPostcode] = useState<string>(
    defaultDeliveryAddress ? defaultDeliveryAddress.postcode : ""
  );

  const [cardError, setCardError] = useState("");

  function onSubmit() {
    if (paymentMethods.length <= 0 && !patient.exemption) {
      setCardError("Please add a payment method");
      return;
    }

    if (!selectedPaymentMethod && !patient.exemption) {
      setCardError("Please select a payment method");
      return;
    }

    if (selectedPaymentMethod && !patient.exemption) {
      dispatch(setDefaultPaymentMethod({ id: selectedPaymentMethod }));
    }

    dispatch(confirmDefaultPaymentMethod());
    history.push(
      "/account/auto-ordering/confirm-medicine",
      location.state && location.state.referrer
        ? { referrer: location.state.referrer }
        : undefined
    );
  }

  return (
    <SecondaryLayout
      flowName="Setup auto ordering"
      currentStep={
        patient.exemption ? "Add payment method" : "Confirm payment method"
      }
      fallbackReturnTo="/account"
    >
      <Card>
        {patient.exemption ? (
          <>
            <DisplayHeading size="xl" margin="0 0 l">
              Add an optional payment method
            </DisplayHeading>
            <Banner
              margin="0 0 l"
              title="You have an exemption or prepayment certificate"
              variant="info"
            >
              Smart ordering will be paused if there’s a period where your
              exemption is no longer valid. We’ll let you know when your
              exemption is about to expire, just in case.
            </Banner>
            <Text margin="0 0 l">
              You can add a payment method in case there’s a period where your
              exemption is no longer valid. This means the smart ordering
              service will continue uninterupted.
            </Text>
          </>
        ) : (
          <>
            <DisplayHeading size="xl" margin="0 0 s">
              Confirm default payment method
            </DisplayHeading>
            <Text margin="0 0 l">
              We’ll automatically take payment when we receive your
              prescription. If you or the person the order is for has an
              exemption, we’ll use that instead.
            </Text>
          </>
        )}

        {paymentMethods.length > 0 && (
          <OptionsGroup
            margin="0 0 m"
            name="delivery-addresses"
            options={paymentMethods.map((card) => ({
              label: (
                <div>
                  <Text>
                    {card.type} ending in {card.last4}
                  </Text>
                  <Text size="s" color="gray70">
                    Expires {card.expiry}
                  </Text>
                  {card.isDefault && (
                    <Tag variant="info" label="Default card" margin="s 0 0" />
                  )}
                </div>
              ),
              value: card.id,
            }))}
            value={selectedPaymentMethod}
            selectionMode="single"
            onChange={(_, value) => {
              setSelectedPaymentMethod(value);
              setCardError("");
            }}
          />
        )}

        {showNewCard && (
          <>
            <Divider />
            <TextInput
              name="cardName"
              label="Cardholder name"
              value={cardName}
              onChange={(e) => setCardName(e.currentTarget.value)}
              margin="0 0 m"
            />
            <TextInput
              name="cardNumber"
              label="Card number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.currentTarget.value)}
              margin="0 0 m"
            />
            <TextInput
              name="cardExpiry"
              label="Expiry date"
              placeholder="MM/YY"
              value={cardExpiry}
              onChange={(e) => setCardExpiry(e.currentTarget.value)}
              margin="0 0 m"
            />
            <TextInput
              name="cardSecurity"
              label="Security code"
              value={cardSecurity}
              onChange={(e) => setCardSecurity(e.currentTarget.value)}
              margin="0 0 m"
            />
            <TextInput
              name="cardPostcode"
              label="Postcode"
              value={cardPostcode}
              onChange={(e) => setCardPostcode(e.currentTarget.value)}
              margin="0 0 m"
            />
          </>
        )}

        {showNewCard ? (
          <>
            <ButtonGroup alignLeft reverseOrder>
              <Button
                variant="secondary"
                label="Add payment method"
                onClick={() => {
                  dispatch(
                    addPaymentMethod({
                      type: "Visa",
                      last4: cardNumber.substr(cardNumber.length - 4),
                      expiry: cardExpiry,
                      isDefault: true,
                    })
                  );
                  setCardError("");
                  setShowNewCard(false);
                }}
              />
              <Button
                variant="tertiary"
                label="Cancel"
                isDestructive
                onClick={() => {
                  setShowNewCard(false);
                }}
              />
            </ButtonGroup>
          </>
        ) : (
          <TextButton
            label="Add a new payment method"
            onClick={() => {
              setShowNewCard(true);
              setCardError("");
            }}
            iconLeading={AddIcon}
          />
        )}

        <Divider />

        {cardError && (
          <Banner variant="error" title={cardError} margin="0 0 l" />
        )}

        <ButtonGroup>
          <Button
            label={patient.exemption ? "Skip" : "Continue"}
            onClick={onSubmit}
          />
          <LinkButton
            label="Go back"
            linkTo={
              location.state && location.state.referrer
                ? {
                    pathname: "/account/auto-ordering/confirm-address",
                    search: location.state.referrer.search,
                    state: { referrer: location.state.referrer },
                  }
                : "/account/auto-ordering/confirm-address"
            }
            variant="secondary"
          />
        </ButtonGroup>
      </Card>
    </SecondaryLayout>
  );
}
