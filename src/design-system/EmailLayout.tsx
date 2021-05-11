import React from "react";
import styled from "../styled";
import { Logo } from "./Logo";
import { EmailFooter } from "./EmailFooter";
import { Icon } from "./Icon";
import { NHSServices } from "./NHSServices";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
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

const MaxWidthWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  flex: 1 1 auto;
  padding-top: ${(p) => p.theme.spacing.m};
  padding-bottom: ${(p) => p.theme.spacing.m};

  @media screen and (min-width: ${(p) => p.theme.breakpoints.s}) {
    padding: ${(p) => p.theme.spacing.m};
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    max-width: ${(p) => `calc(600px + (${p.theme.spacing.xl} * 2))`};
    padding: ${(p) => p.theme.spacing.xl};
  }
`;

const Header = styled.header`
  width: 100%;
  margin-bottom: ${(p) => p.theme.spacing.m};
  padding: 0 ${(p) => p.theme.spacing.m};
  display: flex;
  justify-content: space-between;

  @media screen and (min-width: ${(p) => p.theme.breakpoints.s}) {
    padding: 0;
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    margin-bottom: ${(p) => p.theme.spacing.xl};
  }
`;

export const EmailLayout = ({ children }: Props) => {
  return (
    <Layout>
      <MaxWidthWrapper>
        <Header>
          <Link to="/account" style={{ lineHeight: 0 }}>
            <Logo />
          </Link>
          <Icon type={NHSServices} />
        </Header>
        <main>{children}</main>
        <EmailFooter />
      </MaxWidthWrapper>
    </Layout>
  );
};
