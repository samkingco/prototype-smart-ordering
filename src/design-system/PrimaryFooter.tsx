import React from "react";
import styled, { css } from "styled-components";
import { Text } from "./Text";
import { TextLink } from "./TextLink";
import { Icon } from "./Icon";
import { NHSServices } from "./NHSServices";

const Wrapper = styled.footer`
  grid-area: footer;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  align-items: flex-start;

  ${({ theme }) => css`
    @media screen and (min-width: ${theme.breakpoints.s}) {
      flex-direction: row;
    }
  `}
`;

const NHSLogo = styled.span`
  align-self: flex-end;
  margin-bottom: 20px;

  ${({ theme }) => css`
    @media screen and (min-width: ${theme.breakpoints.s}) {
      margin-bottom: 0px;
    }
  `}
`;

const FooterLink = styled(TextLink)`
  color: ${(p) => p.theme.color.gray70};
  font-size: ${(p) => p.theme.typography.size.xs};
`;

const LinksWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    list-style-type: none;

    @media screen and (min-width: ${theme.breakpoints.m}) {
      justify-content: flex-start;
    }
  `}
`;

const LinkStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;

  ${({ theme }) => css`
    @media screen and (min-width: ${theme.breakpoints.s}) {
      align-items: flex-start;
      width: auto;
      text-align: left;
    }
  `}
`;

export const PrimaryFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Wrapper>
      <Content>
        <LinkStack>
          <LinksWrapper>
            <FooterLink
              label="Help"
              linkTo="https://www.echo.co.uk/help"
              margin="0 m 0 0"
            />
            <FooterLink
              label="Terms &amp; conditions"
              linkTo="https://www.echo.co.uk/p/terms-and-conditions"
              margin="0 m 0 0"
            />
            <FooterLink
              label="Privacy policy"
              linkTo="https://www.echo.co.uk/p/privacy-policy"
            />
          </LinksWrapper>
          <Text nonSensitive size="xs" margin="xs 0 0 0" color="gray70">
            © {currentYear} Metabolic Healthcare Ltd
          </Text>
        </LinkStack>
        <NHSLogo>
          <Icon type={NHSServices} size="xl" />
        </NHSLogo>
      </Content>
    </Wrapper>
  );
};
