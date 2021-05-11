import React from "react";
import styled from "styled-components";
import { css } from "styled-components";
import { PrimaryNav, DESKTOP_NAVIGATION_WIDTH } from "./PrimaryNav";
import { PrimaryFooter } from "./PrimaryFooter";
import { SkipNavLink, SkipNavContent } from "./SkipNav";

interface Props {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100%; /* IE 11 flexbox min-height fix */
    width: 100%;
    background-color: ${theme.color.gray10};

    @media screen and (min-width: ${theme.breakpoints.m}) {
      display: grid;
      grid-template-areas:
        "nav content"
        "nav footer";
      grid-template-rows: auto 100px;
      grid-template-columns: ${DESKTOP_NAVIGATION_WIDTH} 1fr;
    }
  `};
`;

const Content = styled.main`
  ${({ theme }) => css`
    box-sizing: border-box;
    font-size: ${theme.typography.size.m};
    line-height: ${theme.typography.lineHeight.m};
    font-family: ${theme.typography.bodyFamily};
    flex: 1 1 auto;
    padding-top: ${theme.spacing.m};
    padding-bottom: ${theme.spacing.m};

    @media screen and (min-width: ${theme.breakpoints.s}) {
      padding: ${theme.spacing.m};
    }

    @media screen and (min-width: ${theme.breakpoints.m}) {
      grid-area: content;
      width: 100%;
      max-width: calc(${theme.spacing.xl} * 2 + 600px);
      margin: 0 auto;
      padding: ${theme.spacing.xl};
    }
  `};
`;

export const PrimaryLayout = ({ children }: Props) => {
  return (
    <Wrapper>
      <SkipNavLink />
      <PrimaryNav />
      <SkipNavContent />
      <Content>{children}</Content>
      <PrimaryFooter />
    </Wrapper>
  );
};
