import { AddIcon } from "@echo-health/icons-web";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
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
import { getDeliveryAddresses } from "../../store/account/selectors";
import {
  confirmDefaultDeliveryAddress,
  setDefaultDeliveryAddress,
} from "../../store/account/slice";

export function ConfirmAddress() {
  const location = useLocation<{ referrer: Location }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const deliveryAddresses = useSelector(getDeliveryAddresses);
  const defaultDeliveryAddress = deliveryAddresses.find((i) => i.isDefault);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(
    defaultDeliveryAddress && defaultDeliveryAddress.id
  );

  function onSubmit() {
    if (!selectedDeliveryAddress) return;

    dispatch(setDefaultDeliveryAddress({ id: selectedDeliveryAddress }));
    dispatch(confirmDefaultDeliveryAddress());
    history.push(
      "/account/auto-ordering/confirm-payment",
      location.state && location.state.referrer
        ? { referrer: location.state.referrer }
        : undefined
    );
  }

  return (
    <SecondaryLayout
      flowName="Setup auto ordering"
      currentStep="Confirm address"
      fallbackReturnTo="/account"
    >
      <Card>
        <DisplayHeading size="xl" margin="0 0 s">
          Confirm default address
        </DisplayHeading>
        <Text>
          We’ll send your auto orders to this address, unless you change it
          manually.
        </Text>

        {deliveryAddresses.length === 1 ? (
          <>
            <Text isBold margin="m 0 0">
              Delivery address
            </Text>
            <Text>{deliveryAddresses[0].line1}</Text>
            <Text>{deliveryAddresses[0].city}</Text>
            <Text margin="0 0 m">{deliveryAddresses[0].postcode}</Text>
          </>
        ) : (
          <OptionsGroup
            margin="l 0 m"
            name="delivery-addresses"
            options={deliveryAddresses.map((address) => ({
              label: (
                <div>
                  <Text>{address.line1}</Text>
                  <Text size="s" color="gray70">
                    {address.city}, {address.postcode}
                  </Text>
                  {address.isDefault && (
                    <Tag
                      variant="info"
                      label="Default address"
                      margin="s 0 0"
                    />
                  )}
                </div>
              ),
              value: address.id,
            }))}
            value={selectedDeliveryAddress}
            selectionMode="single"
            onChange={(_, value) => {
              setSelectedDeliveryAddress(value);
            }}
          />
        )}

        <TextButton
          label="Add a new delivery address"
          onClick={() => {}}
          iconLeading={AddIcon}
        />

        <Divider />

        <ButtonGroup>
          <Button label="Continue" onClick={onSubmit} />
          <LinkButton
            label="Go back"
            linkTo={
              location.state && location.state.referrer
                ? {
                    pathname: "/account/auto-ordering/setup",
                    search: location.state.referrer.search,
                    state: { referrer: location.state.referrer },
                  }
                : "/account/auto-ordering/setup"
            }
            variant="secondary"
          />
        </ButtonGroup>
      </Card>
    </SecondaryLayout>
  );
}
