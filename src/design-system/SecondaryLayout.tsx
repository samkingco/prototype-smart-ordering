import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { Icon } from "./Icon";
import { ClearIcon } from "@echo-health/icons-web";
import { Text } from "./Text";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%; /* IE 11 flexbox min-height fix */
  width: 100%;
  background-color: ${(p) => p.theme.color.gray10};
`;

const Content = styled.main`
  ${({ theme }) => css`
    flex: auto;
    box-sizing: border-box;
    font-size: ${theme.typography.size.m};
    line-height: ${theme.typography.lineHeight.m};
    font-family: ${theme.typography.bodyFamily};
    width: 100%;
    max-width: 560px;
    margin: 0 auto;
    padding: ${theme.spacing.m} 0 ${theme.spacing.xl};

    @media screen and (min-width: ${theme.breakpoints.s}) {
      padding-top: ${theme.spacing.l};
    }

    @media screen and (min-width: ${theme.breakpoints.m}) {
      padding-top: ${theme.spacing.xl};
    }
  `};
`;

const Nav = styled.nav`
  display: flex;
  align-items: flex-start;
  padding: ${(p) => p.theme.spacing.m};
  background-color: ${(p) => p.theme.color.white};
  box-shadow: ${(p) => p.theme.shadow.depth1};

  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    padding: ${(p) => p.theme.spacing.m} ${(p) => p.theme.spacing.l};
    position: sticky;
    top: 0;
    z-index: 1;
  }
`;

const Breadcrumbs = styled.ul`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
`;

const Breadcrumb = styled.li`
  display: flex;
  align-items: center;

  &::after {
    padding: 0 ${(p) => p.theme.spacing.s};
    color: ${(p) => p.theme.color.gray70};
    content: "/";
  }

  &:last-child::after {
    padding: 0;
    content: "";
  }
`;

const CloseButton = styled(Link)`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.color.gray40};
  background: transparent;
  line-height: 1;
  text-decoration: none;
  transition: background-color 200ms ease-in-out, box-shadow 200ms ease-in-out,
    color 200ms ease-in-out;
  padding: ${(p) => p.theme.spacing.s};
  margin: -${(p) => p.theme.spacing.s};
  border-radius: 100%;

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

interface Props {
  children: React.ReactNode;
  flowName: string;
  currentStep: string;
  fallbackReturnTo?: string;
}

export const SecondaryLayout = (props: Props) => {
  const location = useLocation<{ referrer: Location }>();
  const closeLink =
    location.state && location.state.referrer
      ? {
          pathname: location.state.referrer.pathname,
          search: location.state.referrer.search,
        }
      : props.fallbackReturnTo;

  return (
    <Wrapper>
      <Nav>
        <Breadcrumbs>
          <Breadcrumb>
            <Text isInline color="gray70">
              {props.flowName}
            </Text>
          </Breadcrumb>
          <Breadcrumb>
            <Text isInline>{props.currentStep}</Text>
          </Breadcrumb>
        </Breadcrumbs>

        <CloseButton to={closeLink || "/"} aria-label="Close">
          <Icon type={ClearIcon} size="m" color="currentColor" />
        </CloseButton>
      </Nav>

      <Content>{props.children}</Content>
    </Wrapper>
  );
};
