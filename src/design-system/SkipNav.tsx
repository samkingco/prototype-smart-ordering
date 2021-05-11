import React from "react";
import styled from "styled-components";

const StyledSkipNavLink = styled.a`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;

  transform: translateY(0);
  transition: transform 0.1s;

  &:focus {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateY(${(p) => p.theme.spacing.s});
    z-index: 2; // Our navigation is z-index: 1
    width: auto;
    height: auto;
    clip: auto;

    outline: none;
    border: none;
    padding: ${(p) => p.theme.spacing.m};
    color: ${(p) => p.theme.color.blue70};
    background: ${(p) => p.theme.color.blue10};
    border-radius: ${(p) => p.theme.misc.borderRadius};
    box-shadow: ${(p) => `${p.theme.shadow.focusRing} ${p.theme.color.blue20}`};

    font-family: ${(p) => p.theme.typography.bodyFamily};
    font-weight: ${(p) => p.theme.typography.weight.bold};
    font-size: ${(p) => p.theme.typography.size.m};
  }
`;

export const SkipNavLink = ({
  contentId = "skip-nav-content",
  children = "Skip to content",
  ...props
}: {
  contentId?: string;
  children?: React.ReactNode;
}) => {
  return (
    <StyledSkipNavLink {...props} href={`#${contentId}`}>
      {children}
    </StyledSkipNavLink>
  );
};

export const SkipNavContent = ({
  id = "skip-nav-content",
  ...props
}: {
  id?: string;
}) => <div {...props} id={id} />;
