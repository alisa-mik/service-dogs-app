import styled from "styled-components";
import { Row } from "../commonParts/Layouts";
import { TOASTED_PINE_NUT } from "../../config/colors";
import { uniqueId } from "lodash";
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
  padding: 5px;
`;

export const ResolveIcon = ({
  checked,
  id,
  handleChange
}: {
  checked: boolean;
  id: string;
  handleChange: (id: string, value: boolean) => void;
}) => {

  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (isLoading) setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(t);
    };
  }, [ isLoading ]);

  const handleClick = () => {
    if (isLoading) return;

    handleChange(id, !checked);
    setIsLoading(true);
  };

  const renderResolvedIcon = () => {
    if (isLoading)
      return (
        <img
          style={{ height: "20px", opacity: 0.3 }}
          src={`/checked.png`}
        />
      );

    if (checked)
      return (
        <img style={{ height: "20px" }} src={`/checked.png`} />
      );

    return <ResolveCheckbox />;
  };

  return <IconRow onClick={handleClick}>{renderResolvedIcon()}</IconRow>;
};
