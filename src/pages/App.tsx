import { ReactElement, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TOP_BAR_HIGHT } from "../config/constants";
import { BEIGE_LIGHT, BROWN_DARK, YELLOW } from "../config/colors";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { fetchAllUpdates } from "../store/updatesSlice";
import { fetchDogs } from "../store/dogsSlice";
import { fetchFamilies } from "../store/familiesSlice";
import { fetchGroups } from "../store/trainingGroupsSlice";

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

const tabs = {
  // main: {
  //   label: "ראשי",
  //   navigateTo: "main",
  // },
  dogs: {
    label: "כלבים",
    navigateTo: "dogs",
  },
  // updates: {
  //   label: "עידכונים",
  //   navigateTo: "updates",
  // },
  families: {
    label: "משפחות",
    navigateTo: "families",
  },
  groups: {
    label: "קבוצות",
    navigateTo: "groups",
  },
  // "dogs-in-training": {
  //   label: "הכשרה",
  //   navigateTo: "dogs-in-training",
  // },
  // "2-on-4": {
  //   label: "2 על 4",
  //   navigateTo: "2-on-4",
  // },
  // "dogs-for-soldiers": {
  //   label: "כלבים ללוחמים",
  //   navigateTo: "dogs-for-soldiers",
  // },
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDogs());
    dispatch(fetchGroups());
    dispatch(fetchAllUpdates({}));
    dispatch(fetchFamilies());
  }, [dispatch]);

  useEffect(() => {
    const tabByLocation = location.pathname.split("/")[2];
    if (isEmpty(tabByLocation)) navigate("/app/dogs");
  }, [location]);

  useEffect(() => {
    const tabByLocation = location.pathname.split("/")[2];
    setSelectedTab(tabByLocation);
  }, [location]);

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
