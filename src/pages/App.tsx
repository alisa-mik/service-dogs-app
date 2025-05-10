import { ReactElement, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TOP_BAR_HIGHT } from "../config/constants";
import { BEIGE_LIGHT, BROWN_DARK, YELLOW } from "../config/colors";
import { isEmpty, uniqueId } from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { fetchAllUpdates } from "../store/updatesSlice";
import { fetchDogs } from "../store/dogsSlice";
import { fetchFamilies } from "../store/familiesSlice";
import { fetchGroups } from "../store/trainingGroupsSlice";
import { version } from "../package.alias.json";
import { motion, useAnimation } from "framer-motion";
import { fetchFamilyUpdates } from "../store/familyUpdatesSlice";
import { fetchToDos } from "../store/todosSlice";
import { CurrentDateTimeHebrew } from "../components/CurrentDateTime";
import { Row } from "../components/commonParts/Layouts";

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
  main: {
    label: "בקשות",
    navigateTo: "main",
  },
  dogs: {
    label: "כלבים",
    navigateTo: "dogs",
  },
  families: {
    label: "משפחות",
    navigateTo: "families",
  },
  groups: {
    label: "קבוצות",
    navigateTo: "groups",
  },
};

export default function App() {
  const controls = useAnimation();
  const location = useLocation();
  const navigate = useNavigate();

  const [ selectedTab, setSelectedTab ] = useState("");
  const [ showVersion, setShowVersion ] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const params = {
    status: undefined,
    startDate: 1740787200000,
    endDate: 1745548800000,
  };

  useEffect(() => {
    dispatch(fetchDogs());
    dispatch(fetchGroups());
    dispatch(fetchAllUpdates({}));
    dispatch(fetchFamilies());
    dispatch(fetchFamilyUpdates(params));
    dispatch(fetchToDos({ limit: 100 }))
  }, [ dispatch ]);

  useEffect(() => {
    const tabByLocation = location.pathname.split("/")[ 2 ];
    if (isEmpty(tabByLocation)) navigate("/app/dogs");
  }, [ location ]);

  useEffect(() => {
    const tabByLocation = location.pathname.split("/")[ 2 ];
    setSelectedTab(tabByLocation);
  }, [ location ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showVersion) {
        controls.start({
          x: 0,
          transition: { duration: 1, ease: [ 0.25, 3.5, 0.5, 1 ] },
        });
      }
      if (!showVersion) {
        controls.start({
          x: "100%",
          transition: { duration: 1, ease: "easeOut" },
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [ controls, showVersion ]);

  const renderItems = (): ReactElement[] => {
    return Object.entries(tabs).map(([ navigateTo, tab ]) => {
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
        <img
          style={{ height: "40px", zIndex: 1 }}
          src={`/dog-waving.png?v=${uniqueId()}`}
          onMouseEnter={() => setShowVersion(true)}
          onMouseLeave={() => setShowVersion(false)}
        />
        <motion.div initial={{ x: "100%" }} animate={controls}>
          {version}
        </motion.div>
        <CurrentDateTimeHebrew />
      </TopBar>
      <Body>
        <Outlet />
      </Body>
    </Container>
  );
}
