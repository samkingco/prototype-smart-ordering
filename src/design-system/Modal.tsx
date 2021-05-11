import React from "react";
import {
  DialogOverlay as ReachDialogOverlay,
  DialogContent as ReachDialogContent,
} from "@reach/dialog";
import styled, { createGlobalStyle, css, keyframes } from "styled-components";
import { ClearIcon } from "@echo-health/icons-web";
import { Heading } from "./Heading";
import { Icon } from "./Icon";

// We're copying in the base reach dialog styles here to avoid
// loading the CSS file via webpack. It means if we update reach dialog,
// we also have to update these styles in case anything breaks :(
const BaseReachStyles = createGlobalStyle`
  /* Used to detect in JavaScript if apps have loaded styles or not. */
  :root {
    --reach-dialog: 1;
  }

  [data-reach-dialog-overlay] {
    background: hsla(0, 0%, 0%, 0.33);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
  }

  [data-reach-dialog-content] {
    width: 50vw;
    margin: 10vh auto;
    background: white;
    padding: 2rem;
    outline: none;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledReachDialogOverlay = styled(ReachDialogOverlay)`
  /* Custom styles */
  &[data-reach-dialog-overlay] {
    background: rgba(0, 0, 0, 0.48);
    animation: ${fadeIn} 200ms ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;

    /* Always displays above all other elements */
    z-index: 1000;
  }
`;

type ModalMaxWidth = "500" | "800";

const StyledReachDialogContent = styled(({ maxWidth, ...props }) => (
  <ReachDialogContent {...props} />
))<{
  maxWidth: ModalMaxWidth;
}>`
  &[data-reach-dialog-content] {
    background: none;
    flex-grow: 1;
    padding: ${(p) => p.theme.spacing.s};
    max-width: ${(p) => `calc(${p.maxWidth}px + ${p.theme.spacing.s} * 2)`};
    width: auto;

    /* https://stackoverflow.com/questions/33454533/cant-scroll-to-top-of-flex-item-that-is-overflowing-container */
    margin: auto;

    ${(p) => css`
      @media screen and (min-width: ${p.theme.breakpoints.m}) {
        padding: ${p.theme.spacing.l};
        max-width: ${`calc(${p.maxWidth}px + ${p.theme.spacing.l} * 2)`};
      }
    `}
  }
`;

const fadeAndSlide = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 24px, 0) scale(0.98);
  }
  80% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
`;

const DialogCard = styled.div`
  background: ${(p) => p.theme.color.white};
  border-radius: ${(p) => p.theme.misc.borderRadius};
  box-shadow: ${(p) => p.theme.shadow.depth3};
  animation: ${fadeAndSlide} 200ms ease-in-out;
`;

const HeaderRow = styled.div<{ isTitleVisible: boolean }>`
  position: sticky;
  /* This prevents small 1px artifacts when the content scrolls behind the header: */
  top: -1px;

  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-areas:
    "title close"
    "divider divider";
  grid-row-gap: ${(p) => p.theme.spacing.m};
  align-items: center;
  border-top-left-radius: ${(p) => p.theme.misc.borderRadius};
  border-top-right-radius: ${(p) => p.theme.misc.borderRadius};
  padding: ${(p) => p.theme.spacing.m};
  padding-bottom: 0;
  background: ${(p) =>
    p.isTitleVisible ? p.theme.color.white : "transparent"};

  /* Header will always display above content */
  z-index: 2;

  ${(p) => css`
    @media screen and (min-width: ${p.theme.breakpoints.m}) {
      padding: ${p.theme.spacing.xl};
      padding-bottom: 0;
    }
  `}

  ${(p) =>
    !p.isTitleVisible &&
    css`
      /* Set the height of the header to zero to remove the extra space
      but still keep the close cross in the top right */
      height: 0;
    `}
`;

const Title = styled(Heading)`
  grid-area: title;
`;

const Content = styled.div<{ isTitleVisible: boolean }>`
  padding: ${(p) => p.theme.spacing.m};

  ${(p) => css`
    @media screen and (min-width: ${p.theme.breakpoints.m}) {
      padding: ${p.theme.spacing.xl};
      padding-top: ${!p.isTitleVisible ? 0 : p.theme.spacing.m};
    }
  `}
`;

const CloseButton = styled.button`
  grid-area: close;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.color.gray40};
  background: ${(p) => p.theme.color.white};
  line-height: 1;
  text-decoration: none;
  transition: background-color 200ms ease-in-out, box-shadow 200ms ease-in-out,
    color 200ms ease-in-out;
  padding: ${(p) => p.theme.spacing.s};
  margin: -${(p) => p.theme.spacing.s};
  border-radius: 100%;
  appearance: none;
  outline: 0;
  border: 0;
  cursor: pointer;

  &:hover,
  &:focus {
    color: ${(p) => p.theme.color.blue60};
  }

  &:hover {
    background: ${(p) => p.theme.color.blue10};
  }

  &:focus:not(:hover) {
    box-shadow: ${(p) => `${p.theme.shadow.focusRing} ${p.theme.color.blue20}`};
  }
`;

const HeaderDivider = styled.hr`
  grid-area: divider;
  border: 0;
  border-top: 1px solid ${(p) => p.theme.color.gray10};
`;

interface ModalProps {
  children: React.ReactNode;
  title: string;
  isTitleVisible?: boolean;
  maxWidth?: ModalMaxWidth;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({
  children,
  title,
  isTitleVisible = true,
  maxWidth = "500",
  isOpen,
  onClose,
}: ModalProps) {
  return (
    <>
      <BaseReachStyles />
      <StyledReachDialogOverlay isOpen={isOpen} onDismiss={onClose}>
        <StyledReachDialogContent
          aria-label={isTitleVisible ? undefined : title}
          aria-labelledby={isTitleVisible ? "dialog-title" : undefined}
          maxWidth={maxWidth}
        >
          <DialogCard>
            <HeaderRow isTitleVisible={isTitleVisible}>
              {isTitleVisible && <Title id="dialog-title">{title}</Title>}
              <CloseButton onClick={onClose} aria-label="Close">
                <Icon type={ClearIcon} size="m" color="currentColor" />
              </CloseButton>
              {isTitleVisible && <HeaderDivider />}
            </HeaderRow>
            <Content isTitleVisible={isTitleVisible}>{children}</Content>
          </DialogCard>
        </StyledReachDialogContent>
      </StyledReachDialogOverlay>
    </>
  );
}
