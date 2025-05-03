import { isEmpty, uniqueId } from "lodash";
import { RequestInfo } from "../../types/familyUpdateTypes";
import DateText from "../commonParts/DateText";
import { Label } from "../commonParts/Labels";
import { Column, Row } from "../commonParts/Layouts";
import styled from "styled-components";
import { PAINTED_PONY, TOASTED_PINE_NUT } from "../../config/colors";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSelectedGroupId } from "../../store/trainingGroupsSlice";
import { useFamilyUpdateResolve } from "../../hooks/useFamilyUpdateResolve";

interface RequestsDetailsProps {
  requests: RequestInfo[];
  isTypeOther: boolean;
}

const SRow = styled(Row)`
  color: ${PAINTED_PONY};
`;

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

export function RequestsDetails({
  requests,
  isTypeOther,
}: RequestsDetailsProps) {
  const { handleResolve } = useFamilyUpdateResolve();
  const selectedGroupId = useSelector(selectSelectedGroupId);

  const renderItems = () => {
    return requests?.map((item) => {
      const {
        dogName,
        groupId,
        updateId,
        contactName,
        familyName,
        comments,
        createdAt,
        resolved,
      } = item;

      const renderResolvedIcon = () => {
        const icon = resolved ? (
          <img
            style={{ height: "20px" }}
            src={`/checked.png?v=${uniqueId()}`}
          />
        ) : (
          <ResolveCheckbox />
        );
        return icon;
      };

      return (
        <Column gap="0px" key={createdAt}>
          <Row>
            <Label>{dogName}</Label>
            <Label>
              {contactName} {familyName}
            </Label>
            {!selectedGroupId && <Label>{groupId}</Label>}
            <DateText date={createdAt} />
            <IconRow onClick={() => handleResolve(updateId, !resolved)}>
              {renderResolvedIcon()}
            </IconRow>
          </Row>
          {isTypeOther && !isEmpty(comments) && <SRow>הערות: {comments}</SRow>}
        </Column>
      );
    });
  };

  return <Column>{renderItems()}</Column>;
}
