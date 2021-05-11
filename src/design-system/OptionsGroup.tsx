import React from "react";
import styled, { css } from "styled-components";
import withMargin, { WithMarginProp } from "../styled/withMargin";
import { RadioInput } from "./RadioInput";
import { CheckboxInput } from "./CheckboxInput";
import { Text } from "./Text";
import { VisuallyHidden } from "./VisuallyHidden";

const OuterWrapper = styled.div<WithMarginProp>`
  width: 100%;
  ${withMargin};
`;

const ResetFieldset = styled.fieldset`
  border: 0;
  padding: 0.01em 0 0 0;
  margin: 0;
  min-width: 0;
`;

const Legend = styled.legend`
  font-size: ${(p) => p.theme.typography.size.m};
  font-weight: ${(p) => p.theme.typography.weight.bold};
  line-height: ${(p) => p.theme.typography.lineHeight.m};
  color: ${(p) => p.theme.color.gray90};
  margin-bottom: ${(p) => p.theme.spacing.s};
`;

const InputGroupWrapper = styled.div<{ hasError: boolean; maxHeight?: number }>`
  overflow: hidden;
  border-radius: ${(p) => p.theme.misc.borderRadius};
  border: 2px solid ${(p) => p.theme.color.gray20};

  ${(p) =>
    p.hasError &&
    css`
      border-color: ${p.theme.color.red60};
    `}

  ${(p) =>
    !!p.maxHeight &&
    css`
      max-height: ${p.maxHeight}px;
      overflow: scroll;
    `}
`;

const InputWrapper = styled.div<{ isChecked: boolean; isDisabled: boolean }>`
  padding: 12px;
  background-color: ${(p) =>
    p.isChecked ? p.theme.color.blue10 : p.theme.color.white};
  & + & {
    border-top: 1px solid ${(p) => p.theme.color.gray10};
  }

  &:hover {
    background-color: ${(p) => p.theme.color.gray10};
  }

  ${(p) =>
    p.isDisabled &&
    css`
      background-color: ${(p) => p.theme.color.gray10};
    `}
`;

const AdditionalMessage = styled(Text)`
  padding: ${(p) => `${p.theme.spacing.s} 12px 0`};
`;

export interface Option {
  label?: string | React.ReactNode;
  value: string;
  disabled?: boolean;
}

interface BaseOptionsGroupProps extends WithMarginProp {
  options: Option[];
  name: string;
  className?: string;
  onChange: (
    event: React.FormEvent<HTMLInputElement>,
    value: string,
    checked: boolean
  ) => void;

  /**
   * This prop will actually be rendered within a legend for the fieldset
   * which wraps all of the inputs
   */
  label?: string;

  /**
   * If true when a label is supplied a legend will still be rendered but
   * it will not be visible on screen and will only be read for screen-readers
   */
  labelHidden?: boolean;

  /**
   * `aria-labelled-by` prop for custom label elements.
   */
  labelledBy?: string;

  disabled?: boolean;
  errorMessage?: string;
  helpMessage?: string;

  /**
   * For long lists of options (e.g. search results) you can specify a max height
   * of the container after which results will scroll within the container
   */
  maxHeight?: number;
}

interface SingleSelectionOptionsGroupProps extends BaseOptionsGroupProps {
  selectionMode: "single";

  /**
   * value prop for single select is a string value
   * for the radio which should be selected
   */
  value?: string;
}

interface MultiSelectionOptionsGroupProps extends BaseOptionsGroupProps {
  selectionMode: "multi";

  /**
   * value prop for multi select is an array of all of the values
   * for the checkboxes which should be checked
   */
  value?: string[];
}

export type OptionsGroupProps =
  | SingleSelectionOptionsGroupProps
  | MultiSelectionOptionsGroupProps;

export const OptionsGroup = (props: OptionsGroupProps) => {
  const hasLabel = !!props.label;
  const hasError = !!props.errorMessage;

  const labelledBy = hasLabel ? `${props.name}-label` : props.labelledBy;
  const describedBy =
    props.helpMessage && !hasError
      ? `${props.name}-help-message`
      : `${props.name}-error-message`;

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    props.onChange(
      event,
      event.currentTarget.value,
      event.currentTarget.checked
    );
  };

  if (props.options.length === 0) {
    return null;
  }

  return (
    <OuterWrapper margin={props.margin} className={props.className}>
      <ResetFieldset
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        disabled={props.disabled}
      >
        {hasLabel && props.labelHidden && (
          <VisuallyHidden as="legend" id={labelledBy}>
            {props.label}
          </VisuallyHidden>
        )}
        {hasLabel && !props.labelHidden && (
          <Legend id={labelledBy}>{props.label}</Legend>
        )}
        <InputGroupWrapper hasError={hasError} maxHeight={props.maxHeight}>
          {props.options.map((option, index) => {
            const isChecked =
              props.selectionMode === "single"
                ? props.value === option.value
                : !!props.value && props.value.includes(option.value);

            return (
              <InputWrapper
                key={`${props.name}-${index}`}
                isChecked={isChecked}
                isDisabled={!!option.disabled}
              >
                {props.selectionMode === "single" && (
                  <RadioInput
                    {...option}
                    name={props.name}
                    onChange={onChange}
                    checked={isChecked}
                  />
                )}
                {props.selectionMode === "multi" && (
                  <CheckboxInput
                    {...option}
                    name={props.name}
                    onChange={onChange}
                    checked={isChecked}
                  />
                )}
              </InputWrapper>
            );
          })}
        </InputGroupWrapper>
      </ResetFieldset>
      {/* For aria-live to work properly the element with the attribute
       * needs to be included in the initial markup for the page, so we
       * always have this div in the DOM and conditionally populate
       * it with the additional message with padding applied
       */}
      <div id={`${props.name}-error-message`} aria-live="polite">
        {hasError && (
          <AdditionalMessage color="red70" size="s">
            {props.errorMessage}
          </AdditionalMessage>
        )}
      </div>
      <div id={`${props.name}-help-message`}>
        {!hasError && props.helpMessage && (
          <AdditionalMessage color="gray70" size="s">
            {props.helpMessage}
          </AdditionalMessage>
        )}
      </div>
    </OuterWrapper>
  );
};
