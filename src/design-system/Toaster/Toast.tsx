import React, { useRef, useEffect, RefObject } from "react";
import styled, { css } from "styled-components";
import { Icon } from "../Icon";
import {
  CheckIcon,
  ErrorIcon,
  WarningIcon,
  ClearIcon,
} from "@echo-health/icons-web";

import { Action } from "./types";
import { LoadingIndicator } from "../LoadingIndicator";

export type ToastVariant = "info" | "success" | "warning" | "error" | "loading";

type TransitionState =
  | "entering"
  | "entered"
  | "exiting"
  | "exited"
  | "unmounted";

interface ContainerProps {
  transitionState: TransitionState;
}

const transitionLength = 240; // ms

const Container = styled("div")<ContainerProps>`
  ${({ theme, transitionState }) => css`
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: ${theme.spacing.m};
    margin-right: ${theme.spacing.l};
    border-radius: 8px;
    background: ${theme.color.gray70};
    box-shadow: 0 10px 12px rgba(14, 16, 17, 0.1);
    max-width: 300px;
    visibility: visible;

    /* transitions */
    transition: transform ${transitionLength}ms cubic-bezier(0.2, 0, 0, 1),
      opacity ${transitionLength}ms;
    transform: translate3d(
      ${transitionState === "entering" || transitionState === "exiting"
        ? "120%"
        : 0},
      0,
      0
    );

    &:not(:first-child) {
      margin-top: ${theme.spacing.m};
    }

    @media screen and (max-width: ${theme.breakpoints.s}) {
      margin-right: 0;
    }
  `}
`;

const Message = styled("div")`
  ${({ theme }) => css`
    font-size: ${theme.typography.size.m};
    font-family: ${theme.typography.bodyFamily};
    font-weight: ${theme.typography.weight.normal};
    color: ${theme.color.white};
  `}
`;

const Button = styled("button")`
  ${({ theme }) => css`
    border: 0;
    outline: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 ${theme.spacing.s};
    height: 24px;
    background: ${theme.color.gray30};
    border-radius: ${theme.misc.borderRadius};
    margin-left: ${theme.spacing.l};
    color: ${theme.color.gray70};
    cursor: pointer;

    &:not(:first-of-type) {
      margin-left: 12px;
    }

    &:hover,
    &:focus,
    &:active {
      background: ${theme.color.gray80};
      color: ${theme.color.gray30};
    }

    &:focus:not(:hover) {
      box-shadow: ${(p) =>
        `${p.theme.shadow.focusRing} ${p.theme.color.gray50}`};
      color: ${theme.color.gray30};
    }
  `}
`;

const CloseButton = styled("button")`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing.xs};
    border: 0;
    outline: 0;
    border-radius: 50%;
    margin-left: ${theme.spacing.l};
    color: ${theme.color.white};
    cursor: pointer;

    &:not(:first-of-type) {
      margin-left: 12px;
    }

    &:hover,
    &:focus,
    &:active {
      background: ${theme.color.gray80};
    }

    &:focus:not(:hover) {
      box-shadow: ${(p) =>
        `${p.theme.shadow.focusRing} ${p.theme.color.gray50}`};
    }
  `}
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const iconForVariant = (variant: string): React.ReactNode => {
  switch (variant) {
    case "success":
      return <Icon color="green30" margin="0 s 0 0" type={CheckIcon} />;
    case "warning":
      return <Icon color="orange30" margin="0 s 0 0" type={WarningIcon} />;
    case "error":
      return <Icon color="red30" margin="0 s 0 0" type={ErrorIcon} />;
    case "loading":
      return <LoadingIndicator size="l" margin="0 s 0 0" color="white" />;
    default:
      return null;
  }
};

interface Props {
  shouldPersist?: boolean;
  message: string;
  variant?: ToastVariant;
  actions?: Action[];
  onDismiss?: () => void;
  transitionState: TransitionState;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const Toast = ({
  variant,
  shouldPersist,
  message,
  onDismiss,
  actions,
  transitionState,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  const toastCloseButtonRef = useRef<HTMLButtonElement>(null);
  const toastPrimaryActionButtonRef = useRef<HTMLButtonElement>(null);

  const variantType = variant || "info";

  const hasActions = actions && actions.length > 0;

  useEffect(() => {
    if (hasActions || shouldPersist) {
      let focusableRef: RefObject<HTMLButtonElement> | undefined;

      // If the toast has action(s) *and* a close button then the action is the
      // primary interactive element within the toast, otherwise if there is only
      // a close button and no actions then it gets focus as the primary interactive
      // element
      if (
        hasActions &&
        toastPrimaryActionButtonRef &&
        toastPrimaryActionButtonRef.current
      ) {
        focusableRef = toastPrimaryActionButtonRef;
      } else if (
        shouldPersist &&
        toastCloseButtonRef &&
        toastCloseButtonRef.current
      ) {
        focusableRef = toastCloseButtonRef;
      }

      if (focusableRef) {
        // Wait for transition to end before setting focus or stuff gets weird
        setTimeout(
          () =>
            focusableRef &&
            focusableRef.current &&
            focusableRef.current.focus(),
          transitionLength + 100
        );
      }
    }
  }, [
    toastCloseButtonRef,
    toastPrimaryActionButtonRef,
    hasActions,
    shouldPersist,
  ]);

  return (
    <Container
      transitionState={transitionState}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="status"
    >
      <IconWrapper>{iconForVariant(variantType)}</IconWrapper>
      {/* Icon here */}
      <Message>{message}</Message>
      {/* action here */}
      {actions &&
        actions.map((a, index) => (
          <Button
            key={a.label}
            onClick={a.onClick}
            ref={index === 0 ? toastPrimaryActionButtonRef : undefined}
          >
            {a.label}
          </Button>
        ))}
      {shouldPersist && (
        <CloseButton
          onClick={onDismiss}
          aria-label="close"
          ref={toastCloseButtonRef}
        >
          <Icon color="white" type={ClearIcon} size="s" />
        </CloseButton>
      )}
    </Container>
  );
};
