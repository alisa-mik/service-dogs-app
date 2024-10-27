import { ReactElement, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { TOP_BAR_HIGHT } from "../config/constants";
import { BEIGE_LIGHT, BROWN_DARK, YELLOW } from "../config/colors";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  height: ${TOP_BAR_HIGHT}px;
  background-color: ${YELLOW};
  display: flex;
  align-items: end;
  justify-content: flex-start;
  /* gap: 1px; */
  padding: 0 10px;
`;

interface TabProps {
  selected?: boolean;
}

const Tab = styled.div<TabProps>`
  background-color: ${(props) => (props.selected ? BEIGE_LIGHT : YELLOW)};
  width: 120px;
  height: 30px;
  border-radius: 15px 15px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  color: ${BROWN_DARK};
  :hover {
    color: ${BROWN_DARK};
  }
`;

const Body = styled.div`
  overflow: auto;
  position: relative;
  flex: 1;
`;

// const tabs = [
//   {
//     label: "ראשי",
//     navigateTo: "main",
//   },
//   {
//     label: "כלבים",
//     navigateTo: "dogs",
//   },
//   {
//     label: "עידכונים",
//     navigateTo: "updates",
//   },
//   {
//     label: "משפחות",
//     navigateTo: "families",
//   },
//   {
//     label: "פרויקטים",
//     navigateTo: "projects",
//   },
// ];

const tabs = {
  main: {
    label: "ראשי",
    navigateTo: "main",
  },
  dogs: {
    label: "כלבים",
    navigateTo: "dogs",
  },
  updates: {
    label: "עידכונים",
    navigateTo: "updates",
  },
  families: {
    label: "משפחות",
    navigateTo: "families",
  },
  groups: {
    label: "קבוצות",
    navigateTo: "groups",
  },
  projects: {
    label: "פרויקטים",
    navigateTo: "projects",
  },
  breeding: {
    label: "ממשיכי דרך",
    navigateTo: "breeding",
  },
};

export default function App() {
  const location = useLocation();

  const tabByLocation = location.pathname.split("/")[2];

  const [selectedTab, setSelectedTab] = useState(tabByLocation);

  const renderItems = (): ReactElement[] => {
    return Object.entries(tabs).map(([navigateTo, tab]) => {
      return (
        <StyledLink
          key={tab.label}
          to={navigateTo}
          onClick={() => setSelectedTab(navigateTo)}
        >
          <Tab selected={selectedTab === navigateTo}>{tab.label}</Tab>
        </StyledLink>
      );
    });
  };

  return (
    <Container>
      <TopBar>
        {renderItems()}
        <img style={{ height: "40px" }} src="/dog-waving.png" />
      </TopBar>
      <Body>
        <Outlet />
      </Body>
    </Container>
  );
}
