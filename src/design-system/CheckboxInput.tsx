import React from "react";
import { DoneIcon } from "@echo-health/icons-web";
import styled, { css } from "styled-components";
import { Icon } from "./Icon";
import withMargin from "../styled/withMargin";
import { Text } from "./Text";

interface LabelProps {
  margin?: string;
  isDisabled: boolean;
}

const Input = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  padding: ${(props) => props.theme.spacing.s} 0;

  &:not(:disabled) {
    cursor: pointer;
  }
`;

const FakeInput = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  min-width: 24px;
  height: 24px;
  transition: all 120ms ease;

  ${({ theme }) => css`
    background: ${theme.color.white};
    border-radius: ${theme.misc.borderRadius};
    border: 2px solid ${theme.color.gray20};

    ${Input}:not(:disabled):focus + & {
      box-shadow: ${theme.shadow.focusRing} ${theme.color.gray20};
      border-color: ${theme.color.gray40};
    }
    ${Input}:not(:disabled):hover + & {
      border-color: ${theme.color.gray40};
    }

    ${Input}:checked + & {
      background: ${theme.color.blue60};
      border-color: ${theme.color.blue60};
    }
    ${Input}:checked:focus + & {
      background: ${theme.color.blue70};
      box-shadow: ${theme.shadow.focusRing} ${theme.color.blue20};
      border-color: ${theme.color.blue70};
    }
    ${Input}:checked:hover + & {
      background: ${theme.color.blue70};
      border-color: ${theme.color.blue70};
    }
    ${Input}:disabled + & {
      background: ${theme.color.gray20};
    }
    ${Input}:disabled:checked + & {
      background: ${theme.color.gray20};
      border-color: ${theme.color.gray20};
    }
  `};
`;

const Label = styled("label")<LabelProps>`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${({ isDisabled, theme }) => css`
    ${!isDisabled &&
    css`
      &:hover,
      &:active {
        color: ${theme.color.gray90};
      }
    `}
  `}

  ${withMargin};
`;

const TextWrapper = styled.span`
  display: flex;
  flex-direction: column;

  margin-left: ${(p) => p.theme.spacing.s};
`;

export type CheckboxInputProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  "label"
> & {
  label?: string | React.ReactNode;
  margin?: string;
};

export const CheckboxInput = ({
  label,
  margin,
  ref,
  className,
  as,
  ...inputProps
}: CheckboxInputProps) => {
  return (
    <Label
      margin={margin}
      isDisabled={!!inputProps.disabled}
      as={label ? "label" : "div"}
      className={className}
    >
      <Input type="checkbox" {...inputProps} />
      <FakeInput>
        <Icon
          type={DoneIcon}
          size="s"
          color={!inputProps.disabled ? "white" : "gray40"}
        />
      </FakeInput>
      {label && (
        <TextWrapper>
          {typeof label === "string" ? <Text>{label}</Text> : label}
        </TextWrapper>
      )}
    </Label>
  );
};
