import React from "react";
import styled, { css } from "styled-components";
import withMargin, { WithMarginProp } from "../styled/withMargin";
import { Text } from "./Text";

type InputType = "input" | "selectionControl" | "text";

const leftSpaceMap: { [key in InputType]: number } = {
  input: 12,
  selectionControl: 36,
  text: 0,
};

interface AdditionalTextProps {
  inputType?: InputType;
  children: React.ReactNode;
}

const StyledAdditionalText = styled(Text)<{ leftSpace?: number }>`
  margin-top: ${(p) => p.theme.space.s};
  margin-left: ${(p) => (p.leftSpace ? `${p.leftSpace}px` : 0)};
`;

export const ValidationText = ({
  inputType = "input",
  children,
}: AdditionalTextProps) => {
  let leftSpace = leftSpaceMap[inputType];
  return (
    <StyledAdditionalText size="s" color="red70" leftSpace={leftSpace}>
      {children}
    </StyledAdditionalText>
  );
};

export const HelpText = ({
  inputType = "input",
  children,
}: AdditionalTextProps) => {
  let leftSpace = leftSpaceMap[inputType];
  return (
    <StyledAdditionalText size="s" color="gray70" leftSpace={leftSpace}>
      {children}
    </StyledAdditionalText>
  );
};

interface StyledInputProps {
  hasLabel: boolean;
  hasValidationMessage: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
  border: 2px solid
    ${(p) =>
      p.hasValidationMessage ? p.theme.color.red60 : p.theme.color.gray20};
  border-radius: ${(p) => p.theme.misc.borderRadius};
  padding: 12px;
  font-size: ${(p) => p.theme.typography.size.m};
  font-family: ${(p) => p.theme.typography.bodyFamily};
  color: ${(p) => p.theme.color.gray90};
  outline: none;
  width: 100%;
  -webkit-appearance: none;

  ::placeholder {
    opacity: 1;
    color: ${(p) => p.theme.color.gray40};
  }

  &:hover {
    border-color: ${(p) =>
      p.hasValidationMessage ? p.theme.color.red80 : p.theme.color.gray40};
  }

  &:focus {
    border-color: ${(p) => p.theme.color.blue60};
    box-shadow: ${(p) => `${p.theme.shadow.focusRing} ${p.theme.color.blue20}`};
  }

  ${(p) => {
    if (p.hasLabel) {
      return css`
        padding-top: ${(p) => p.theme.spacing.xl};
      `;
    }
  }}
`;

interface LabelProps {
  hasValue: boolean;
}

const Label = styled.label<LabelProps>`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-size: ${(p) => p.theme.typography.size.m};
  color: ${(p) => (p.hasValue ? p.theme.color.blue70 : p.theme.color.gray70)};
  padding: 12px 12px 0;
  cursor: pointer;

  ${StyledInput}:focus + & {
    color: ${(p) => p.theme.color.blue70};
  }
`;

const Wrapper = styled.div<WithMarginProp>`
  position: relative;
  ${withMargin};
`;

interface TextInputProps
  extends React.HTMLProps<HTMLInputElement>,
    WithMarginProp {
  name: string;
  label?: string;
  helpMessage?: React.ReactNode;
  validationMessage?: React.ReactNode;
}

export const TextInput = React.forwardRef(
  (
    {
      name,
      label,
      validationMessage,
      helpMessage,
      as,
      margin,
      ...props
    }: TextInputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <Wrapper margin={margin}>
        <StyledInput
          {...props}
          ref={ref}
          id={name}
          name={name}
          hasLabel={Boolean(label)}
          hasValidationMessage={Boolean(validationMessage)}
        />
        {label && (
          <Label hasValue={Boolean(props.value)} htmlFor={name}>
            {label}
          </Label>
        )}
        {validationMessage && (
          <ValidationText>{validationMessage}</ValidationText>
        )}
        {helpMessage && <HelpText>{helpMessage}</HelpText>}
      </Wrapper>
    );
  }
);
