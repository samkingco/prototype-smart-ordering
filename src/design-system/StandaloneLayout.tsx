import React from "react";
import styled from "../styled";
import { Link } from "react-router-dom";
import { LocationDescriptor } from "history";
import { Logo } from "./Logo";
import { PrimaryFooter } from "./PrimaryFooter";

type ContentWidth = "420" | "500" | "560" | "600";

interface Props {
  children: React.ReactNode;
  contentWidth?: ContentWidth;
  logoLinkTo?: string | LocationDescriptor;
  isLogoCentred?: boolean;
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%; /* IE 11 flexbox min-height fix */
  width: 100%;
  background-color: ${(p) => p.theme.color.gray10};
`;

const MaxWidthWrapper = styled.div<{ contentWidth: ContentWidth }>`
  width: 100%;
  margin: 0 auto;
  flex: 1 1 auto;
  padding-top: ${(p) => p.theme.spacing.m};
  padding-bottom: ${(p) => p.theme.spacing.m};

  @media screen and (min-width: ${(p) => p.theme.breakpoints.s}) {
    padding: ${(p) => p.theme.spacing.m};
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    max-width: ${(p) =>
      `calc(${p.contentWidth}px + (${p.theme.spacing.xl} * 2))`};
    padding: ${(p) => p.theme.spacing.xl};
  }
`;

const LogoWrapper = styled.div``;

const Header = styled.header`
  width: 100%;
  margin-bottom: ${(p) => p.theme.spacing.m};
  padding: 0 ${(p) => p.theme.spacing.m};
  display: flex;
  justify-content: center;

  ${LogoWrapper} {
    // Optically centre the Echo logo
    padding-right: 40px;
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.s}) {
    padding: 0;
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    margin-bottom: ${(p) => p.theme.spacing.xl};
  }
`;

export const StandaloneLayout = ({
  children,
  contentWidth = "560",
  logoLinkTo,
}: Props) => {
  return (
    <Layout>
      <MaxWidthWrapper contentWidth={contentWidth}>
        <Header>
          <LogoWrapper>
            {logoLinkTo ? (
              <Link to={logoLinkTo}>
                <Logo />
              </Link>
            ) : (
              <Logo />
            )}
          </LogoWrapper>
        </Header>
        <main>{children}</main>
      </MaxWidthWrapper>
      <PrimaryFooter />
    </Layout>
  );
};
