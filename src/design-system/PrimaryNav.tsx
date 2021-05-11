import React, { useState } from "react";
import { NavLink, useRouteMatch, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { Text } from "./Text";
import { LinkButton } from "./LinkButton";
import { Divider } from "./Divider";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import {
  CapsuleIcon,
  HeadsetMicIcon,
  AccountCircleIcon,
  ExitToAppIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  MenuIcon,
  ClearIcon,
  CampaignIcon,
} from "@echo-health/icons-web";
import { VisuallyHidden } from "./VisuallyHidden";
import { Button } from "./Button";
import { Avatar } from "./Avatar";
import { useSelector } from "react-redux";
import { getAccount } from "../store/account/selectors";

export const DESKTOP_NAVIGATION_WIDTH = "240px";

const NavigationLayout = styled.nav<{ isMobileNavExpanded: boolean }>`
  width: 100%;
  min-height: ${(p) => (p.isMobileNavExpanded ? "100vh" : "auto")};
  background: ${(p) => p.theme.color.white};
  box-shadow: ${(p) => p.theme.shadow.depth1};
  overflow: auto;

  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${DESKTOP_NAVIGATION_WIDTH};
  }
`;

const NavigationBar = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: ${(p) => p.theme.spacing.s};
  padding: ${(p) => p.theme.spacing.m};
  align-items: center;

  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    grid-template-columns: 1fr;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;

  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    margin: ${(p) => p.theme.spacing.m} 0;
  }
`;

const MenuToggleButton = styled(Button)`
  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    display: none;
  }
`;

const NavigationContent = styled.div<{ isMobileNavExpanded: boolean }>`
  display: ${(p) => (p.isMobileNavExpanded ? "grid" : "none")};
  grid-template-columns: 1fr;
  grid-gap: ${(p) => p.theme.spacing.s};
  padding: ${(p) => p.theme.spacing.m};
  padding-top: 0;

  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    display: grid;
    padding: ${(p) => `${p.theme.spacing.xl} ${p.theme.spacing.m}`};
    padding-top: 0;
  }
`;

const navigationButtonBaseStyle = css`
  display: grid;
  grid-template-columns: 24px 1fr max-content;
  grid-gap: ${(p) => p.theme.spacing.s};
  align-items: center;
  text-decoration: none;
  padding: ${(p) => p.theme.spacing.m};
  margin-left: ${(p) => `-${p.theme.spacing.m}`};
  margin-right: ${(p) => `-${p.theme.spacing.m}`};
  transition: background-color 250ms ease-in-out, box-shadow 250ms ease-in-out;
  outline: none;
  border: none;
  background: transparent;

  &:hover {
    background-color: ${(p) => p.theme.color.gray10};
  }

  &:focus:not(:hover) {
    background-color: ${(p) => p.theme.color.blue10};
    box-shadow: ${(p) => `${p.theme.shadow.focusRing} ${p.theme.color.blue20}`};
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    padding: ${(p) => p.theme.spacing.s};
    margin-left: ${(p) => `-${p.theme.spacing.s}`};
    margin-right: ${(p) => `-${p.theme.spacing.s}`};
    border-radius: ${(p) => p.theme.spacing.xl};
  }
`;

const navigationLinkBaseStyles = css`
  /* Icon */
  & :nth-child(1) {
    color: ${(p) => p.theme.color.gray40};
  }

  /* Text */
  & :nth-child(2) {
    color: ${(p) => p.theme.color.gray70};
  }

  /* Active state */
  &.active {
    background-color: ${(p) => p.theme.color.blue10};
    & :nth-child(1) {
      color: ${(p) => p.theme.color.blue60};
    }
    & :nth-child(2) {
      color: ${(p) => p.theme.color.blue70};
      font-weight: ${(p) => p.theme.typography.weight.bold};
    }
  }
`;

const NavigationButton = styled.button`
  ${navigationButtonBaseStyle};
  ${navigationLinkBaseStyles};
`;

const NavigationLink = styled(NavLink)`
  ${navigationButtonBaseStyle};
  ${navigationLinkBaseStyles};
`;

const PatientLink = styled(NavLink)`
  ${navigationButtonBaseStyle};
`;

const PatientListToggle = styled.button<{ isOpen: boolean }>`
  ${navigationButtonBaseStyle};
  ${(p) =>
    p.isOpen &&
    css`
      background-color: ${(p) => p.theme.color.blue10};
    `}
`;

const NameText = styled(Text)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ItemText = styled(Text).attrs({ nonSensitive: true })`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export function PrimaryNav() {
  const { path } = useRouteMatch<{ patientId: string }>();
  const [isPatientPickerExpanded, setIsPatientPickerExpanded] = useState(false);
  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false);

  const { patient } = useSelector(getAccount);

  function onNavigate() {
    // Close the mobile nav and patient picker
    setIsMobileNavExpanded(false);
    setIsPatientPickerExpanded(false);
  }

  return (
    <>
      <NavigationLayout isMobileNavExpanded={isMobileNavExpanded}>
        <NavigationBar>
          <LogoLink to="/">
            <Logo />
          </LogoLink>
          <MenuToggleButton
            label={isMobileNavExpanded ? "Close" : "Menu"}
            iconLeading={isMobileNavExpanded ? ClearIcon : MenuIcon}
            variant="secondary"
            size="s"
            onClick={() => {
              setIsMobileNavExpanded(!isMobileNavExpanded);
            }}
          />
        </NavigationBar>

        <NavigationContent isMobileNavExpanded={isMobileNavExpanded}>
          <Divider margin="0 0 s 0" />
          <>
            <VisuallyHidden id="patientToggleDesc">
              Switch or add new patients
            </VisuallyHidden>
            <PatientListToggle
              aria-describedby="patientToggleDesc"
              isOpen={isPatientPickerExpanded}
              onClick={() => {
                setIsPatientPickerExpanded(!isPatientPickerExpanded);
              }}
            >
              <Avatar
                name={`${patient.firstName} ${patient.lastName}`}
                aria-hidden={true}
              />
              <NameText>
                {patient.firstName} {patient.lastName}
              </NameText>
              <Icon
                type={
                  isPatientPickerExpanded
                    ? KeyboardArrowUpIcon
                    : KeyboardArrowDownIcon
                }
              />
            </PatientListToggle>
            {isPatientPickerExpanded ? (
              <>
                <PatientLink
                  key={patient.id}
                  to={path.replace(":patientId", patient.id)}
                  onClick={() => {
                    onNavigate();
                  }}
                >
                  <Avatar
                    name={`${patient.firstName} ${patient.lastName}`}
                    aria-hidden={true}
                  />
                  <ItemText>
                    {patient.firstName} {patient.lastName}
                  </ItemText>
                </PatientLink>

                <Text size="s" color="gray70" margin="xs 0">
                  Manage medicine for other people by adding them here.
                </Text>
                <LinkButton
                  variant="secondary"
                  label="Add another person"
                  linkTo="/account/add-patient"
                  onClick={() => {
                    onNavigate();
                  }}
                />
              </>
            ) : null}
            <Divider margin="s 0" />
          </>

          <NavigationLink
            to="/medicine"
            onClick={() => {
              onNavigate();
            }}
          >
            <Icon type={CapsuleIcon} />
            <ItemText>Medicine</ItemText>
          </NavigationLink>

          <NavigationLink
            to="/help"
            onClick={() => {
              onNavigate();
            }}
          >
            <Icon type={HeadsetMicIcon} />
            <ItemText>Help</ItemText>
          </NavigationLink>

          <NavigationLink
            to="/account"
            onClick={() => {
              onNavigate();
            }}
          >
            <Icon type={AccountCircleIcon} />
            <ItemText>Account</ItemText>
          </NavigationLink>

          <Divider margin="s 0" />

          <NavigationLink
            to="/whats-new"
            onClick={() => {
              onNavigate();
            }}
          >
            <Icon type={CampaignIcon} />
            <ItemText>What’s new</ItemText>
          </NavigationLink>

          <NavigationButton onClick={() => {}}>
            <Icon type={ExitToAppIcon} />
            <ItemText>Log out</ItemText>
          </NavigationButton>
        </NavigationContent>
      </NavigationLayout>
    </>
  );
}
