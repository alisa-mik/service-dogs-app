import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { styled } from "styled-components";
import { checkSessionOnStart } from "./utils/authUtils";
import { BEIGE_LIGHT } from "./config/colors";
import LoginBoundaries from "./components/LoginBoundaries";
import { isNull } from "lodash";

const FullPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${BEIGE_LIGHT};
  text-align: center;
  padding: 0;
  margin: 0;
  direction: rtl;
`;

const getNav = (pathname: string): string => {
  if (pathname.includes("login")) return "/app/dogs";

  return pathname;
};

const Root = () => {
  const [hasToken, setHasToken] = useState<null | boolean>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { userGroup } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const hasT = checkSessionOnStart(dispatch);

    setHasToken(hasT);
  }, [userGroup]);

  useEffect(() => {
    console.log({ hasToken });

    if (!isNull(hasToken)) {
      if (!hasToken) return navigate("/login");
      if (userGroup === "Admin") {
        const navTo = getNav(location.pathname);

        console.log({ navTo });

        navigate(navTo);
      } else if (userGroup === "Families") {
        navigate("/family");
      }
    }
  }, [userGroup, navigate, hasToken]);

  const renderChildren = () => {
    if (!isNull(hasToken)) {
      return <Outlet />;
    }

    return <></>;
  };

  return (
    <FullPageContainer>
      <LoginBoundaries>{renderChildren()}</LoginBoundaries>
    </FullPageContainer>
  );
};

export default Root;
