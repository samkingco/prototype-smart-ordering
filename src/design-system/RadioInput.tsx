import React from "react";
import styled, { css } from "styled-components";
import withMargin from "../styled/withMargin";
import { Text } from "./Text";

interface LabelProps {
  margin?: string;
  isDisabled: boolean;
}

const Label = styled("label")<LabelProps>`
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.isDisabled ? "default" : "pointer")};
  position: relative;
  color: ${(props) => props.theme.color.gray60};
  ${({ isDisabled, theme }) => css`
    ${!isDisabled &&
    css`
      &:hover {
        color: ${theme.color.gray100};
      }
    `}
  `}
  ${withMargin};
`;

const Input = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  &:not(:disabled) {
    cursor: pointer;
  }
  ${({ theme }) => css`
    padding: ${theme.spacing.s} 0;
  `};
`;

const FakeInput = styled.span`
  width: 100%;
  height: 100%;
  min-width: 20px;
  min-height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 120ms ease;
  box-sizing: border-box;
  &::after {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  ${({ theme }) => css`
    border: 2px solid ${theme.color.gray20};
    background: ${theme.color.white};

    ${Input}:not(:disabled):focus + & {
      box-shadow: ${theme.shadow.focusRing} ${theme.color.gray20};
      border-color: ${theme.color.gray40};
      &::after {
        background: ${theme.color.white};
      }
    }
    ${Input}:not(:disabled):hover + & {
      border-color: ${theme.color.gray40};
    }

    ${Input}:checked + & {
      background: ${theme.color.blue60};
      border-color: ${theme.color.blue60};
      &::after {
        background: ${theme.color.white};
      }
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
      &::after {
        background: ${theme.color.gray40};
      }
    }
  `};
`;

const TextWrapper = styled.span`
  display: flex;
  flex-direction: column;

  margin-left: ${(p) => p.theme.spacing.s};
`;

const InputWrapper = styled.span`
  display: inline-block;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  position: relative;
`;

export type RadioInputProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  "label"
> & {
  label?: string | React.ReactNode;
  margin?: string;
  description?: React.ReactNode;
};

export const RadioInput = ({
  label,
  margin,
  ref,
  className,
  as,
  description,
  ...otherProps
}: RadioInputProps) => (
  <Label
    as={label ? "label" : "div"}
    margin={margin}
    className={className}
    isDisabled={!!otherProps.disabled}
  >
    <InputWrapper>
      <Input type="radio" {...otherProps} />
      <FakeInput />
    </InputWrapper>
    {(!!label || !!description) && (
      <TextWrapper>
        {label && typeof label === "string" && <Text>{label}</Text>}
        {label && typeof label !== "string" && label}
        {description && <Text color="gray70">{description}</Text>}
      </TextWrapper>
    )}
  </Label>
);
