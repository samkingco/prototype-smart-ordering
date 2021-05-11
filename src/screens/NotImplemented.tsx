import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../design-system/Card";
import { Text } from "../design-system/Text";
import { DisplayHeading } from "../design-system/DisplayHeading";
import { Button } from "../design-system/Button";
import { Divider } from "../design-system/Divider";
import { StandaloneLayout } from "../design-system/StandaloneLayout";

export function NotImplemented() {
  const history = useHistory();

  return (
    <StandaloneLayout contentWidth="420">
      <Card>
        <DisplayHeading margin="0 0 s">
          What would you expect here?
        </DisplayHeading>
        <Text>
          This page hasn't been built as part of the prototype, but can you tell
          us what you were expecting to see here?
        </Text>
        <Divider />
        <Button
          label="Go back"
          variant="secondary"
          onClick={() => history.goBack()}
        />
      </Card>
    </StandaloneLayout>
  );
}
