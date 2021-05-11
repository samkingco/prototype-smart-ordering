import { css } from "styled-components";
import { Theme } from "../styled/styled";
import { Content } from "./TextRow";

export const selectableRowStyles = ({
  theme,
  $isDisabled,
}: {
  theme: Theme;
  $isDisabled?: boolean;
}) => css`
  display: flex;
  cursor: pointer;
  color: ${theme.color.gray90};
  transition: background-color 0.2s ease;

  box-sizing: content-box;
  width: 100%;
  margin: 0 -${(p) => p.theme.spacing.m};
  padding: 0 ${(p) => p.theme.spacing.m};

  &:hover {
    background-color: ${theme.color.gray10};
  }

  ${$isDisabled &&
  css`
    cursor: not-allowed;
    &:hover {
      background-color: transparent;
    }
  `}

  @media screen and (min-width: ${theme.breakpoints.s}) {
    border-radius: ${theme.misc.borderRadius};
  }
`;

export const selectableRowInteractionStyles = ({
  theme,
}: {
  theme: Theme;
}) => css`
  /**
   * Just doing this so that the box-shadow focus ring appears above
   * siblings (e.g. list dividers)
   */
  position: relative;

  outline: none;
  transition: box-shadow 200ms ease-in-out;

  &:focus {
    box-shadow: 0 0 0 2px ${theme.color.blue60};
  }
`;

export const linkRowStyles = ({ theme }: { theme: Theme }) => css`
  text-decoration: none;

  &:hover {
    /**
     * Apply underline on hover to row title, but not the subtitle
     */
    ${Content} > *:first-child {
      text-decoration: underline;
    }
  }
`;
