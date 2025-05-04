import styled from "styled-components";
import { Row } from "../commonParts/Layouts";
import { TOASTED_PINE_NUT } from "../../config/colors";
import { uniqueId } from "lodash";
import { useFamilyUpdateResolve } from "../../hooks/useFamilyUpdateResolve";
import { useEffect, useState } from "react";

const IconRow = styled(Row)`
  cursor: pointer;
  width: fit-content;
`;

const ResolveCheckbox = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 6px;
  border: 1px solid ${TOASTED_PINE_NUT};
`;

export const ResolveRequestIcon = ({
  resolved,
  updateId,
}: {
  resolved: boolean;
  updateId: string;
}) => {
  const { handleResolve } = useFamilyUpdateResolve();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (isLoading) setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(t);
    };
  }, [isLoading]);

  const handleClick = () => {
    if (isLoading) return;

    handleResolve(updateId, !resolved);
    setIsLoading(true);
  };

  const renderResolvedIcon = () => {
    if (isLoading)
      return (
        <img
          style={{ height: "20px", opacity: 0.3 }}
          src={`/checked.png?v=${uniqueId()}`}
        />
      );

    if (resolved)
      return (
        <img style={{ height: "20px" }} src={`/checked.png?v=${uniqueId()}`} />
      );

    return <ResolveCheckbox />;
  };

  return <IconRow onClick={handleClick}>{renderResolvedIcon()}</IconRow>;
};
