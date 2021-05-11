import React from "react";
import { ArrowBackIcon } from "@echo-health/icons-web";
import styled, { css } from "styled-components";
import { DisplayHeading } from "./DisplayHeading";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { TextLink } from "./TextLink";
import { Illustration, IllustrationName } from "./Illustration";
import { useLocation } from "react-router-dom";

const MobileIllustrationWrapper = styled.div`
  margin-bottom: ${(p) => p.theme.spacing.m};
`;
const DesktopIllustrationWrapper = styled.div``;
const TextContent = styled.div`
  margin-bottom: ${(p) => p.theme.spacing.m};
`;

const Wrapper = styled.header<{ $hasIllustration: boolean }>`
  display: grid;
  grid-template-columns: ${(p) => (p.$hasIllustration ? "1fr 100px" : "1fr")};
  grid-gap: ${(p) => p.theme.spacing.m};
  align-items: end;
  padding-left: ${(p) => p.theme.spacing.m};
  padding-right: ${(p) => p.theme.spacing.m};

  ${DesktopIllustrationWrapper} {
    display: none;
  }

  ${(p) => css`
    @media screen and (min-width: ${p.theme.breakpoints.s}) {
      padding-left: 0;
      padding-right: 0;
    }

    @media screen and (min-width: ${p.theme.breakpoints.m}) {
      grid-template-columns: ${p.$hasIllustration ? "1fr 355px" : "1fr"};

      ${DesktopIllustrationWrapper} {
        display: block;
      }
      ${MobileIllustrationWrapper} {
        display: none;
      }
    }
  `}
`;

interface Props {
  title: string;
  subtitle?: string;

  // If provided will render a 'back link'
  fallbackReturnTo?: string;
  // If provided will be used for screen readers.
  backLinkLabel?: string;

  mobileIllustration?: IllustrationName;
  desktopIllustration?: IllustrationName;

  sensitive?: boolean;
}

export function PageTitle(props: Props) {
  const location = useLocation<{ referrer: Location }>();
  const backLink =
    location.state && location.state.referrer
      ? {
          pathname: location.state.referrer.pathname,
          search: location.state.referrer.search,
        }
      : props.fallbackReturnTo;

  return (
    <Wrapper
      $hasIllustration={Boolean(
        props.mobileIllustration && props.desktopIllustration
      )}
    >
      <TextContent>
        {backLink && (
          <TextLink
            linkTo={backLink}
            type="internal"
            label={props.backLinkLabel ? props.backLinkLabel : "Back"}
            iconLeading={ArrowBackIcon}
          />
        )}
        {!backLink ? (
          <DisplayHeading
            as="h1"
            size="xxl"
            margin="0"
            className={props.sensitive ? "fs-exclude" : ""}
          >
            {props.title}
          </DisplayHeading>
        ) : (
          <Heading
            as="h1"
            size="xl"
            margin="s 0 0"
            className={props.sensitive ? "fs-exclude" : ""}
          >
            {props.title}
          </Heading>
        )}
        {props.subtitle && <Text>{props.subtitle}</Text>}
      </TextContent>
      {props.mobileIllustration && props.desktopIllustration ? (
        <>
          <MobileIllustrationWrapper>
            <Illustration src={props.mobileIllustration} />
          </MobileIllustrationWrapper>
          <DesktopIllustrationWrapper>
            <Illustration src={props.desktopIllustration} />
          </DesktopIllustrationWrapper>
        </>
      ) : null}
    </Wrapper>
  );
}
