import React from "react";
import styled from "styled-components";
import { IconComponent } from "./Icon";
import TextRow from "./TextRow";
import { RadioInput } from "./RadioInput";
import { CheckboxInput } from "./CheckboxInput";
import { selectableRowStyles } from "./common-row-styles";
import { WithPaddingProp } from "../styled/withPadding";
import SwitchInput from "./SwitchInput";
import { Tooltip } from "./Tooltip";

const LabelWrapper = styled.label`
  ${selectableRowStyles}
`;

interface Props extends WithPaddingProp {
  selectionMode: "single" | "multi" | "switch";
  title: React.ReactNode | string;
  description?: React.ReactNode | string;
  leading?: IconComponent | React.ReactNode;
  trailing?: IconComponent | React.ReactNode;
  additionalContent?: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  disabled?: boolean;
  disabledReason?: string;
}

const OptionRow = ({
  selectionMode,
  title,
  description,
  leading,
  trailing,
  additionalContent,
  onChange,
  checked,
  padding,
  disabled,
  disabledReason,
}: Props) => {
  let leadingEl = leading;
  let trailingEl = trailing;

  if (selectionMode === "single") {
    leadingEl = (
      <RadioInput onChange={onChange} checked={checked} disabled={disabled} />
    );
  } else if (selectionMode === "multi") {
    leadingEl = (
      <CheckboxInput
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
    );
  }

  if (selectionMode === "switch") {
    const input = (
      <SwitchInput onChange={onChange} checked={checked} disabled={disabled} />
    );

    trailingEl = input;

    if (disabled && disabledReason) {
      trailingEl = (
        <Tooltip
          content={disabled && disabledReason ? disabledReason : undefined}
          delayDuration={0}
        >
          {input}
        </Tooltip>
      );
    }
  }

  return (
    <LabelWrapper $isDisabled={disabled}>
      <TextRow
        title={title}
        description={description}
        leading={leadingEl}
        trailing={trailingEl}
        additionalContent={additionalContent}
        padding={padding}
      />
    </LabelWrapper>
  );
};

export default OptionRow;
