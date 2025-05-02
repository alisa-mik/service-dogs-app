import { isEmpty, uniqueId } from "lodash";
import { RequestInfo } from "../../types/familyUpdateTypes";
import DateText from "../commonParts/DateText";
import { Label } from "../commonParts/Labels";
import { Column, Row } from "../commonParts/Layouts";
import styled from "styled-components";
import { PAINTED_PONY } from "../../config/colors";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSelectedGroupId } from "../../store/trainingGroupsSlice";

interface RequestsDetailsProps {
  requests: RequestInfo[];
  isTypeOther: boolean;
}

const SRow = styled(Row)`
  color: ${PAINTED_PONY};
`;

export function RequestsDetails({
  requests,
  isTypeOther,
}: RequestsDetailsProps) {
  console.log({ requests });

  const selectedGroupId = useSelector(selectSelectedGroupId);

  const renderItems = () => {
    return requests?.map((item) => {
      const {
        dogName,
        groupId,
        contactName,
        familyName,
        comments,
        createdAt,
        resolved,
      } = item;

      return (
        <Column gap="0px" key={createdAt}>
          <Row>
            <Label>{dogName}</Label>
            <Label>
              {contactName} {familyName}
            </Label>
            {!selectedGroupId && <Label>{groupId}</Label>}
            <DateText date={createdAt} />
            {resolved && (
              <img
                style={{ height: "20px" }}
                src={`/checked.png?v=${uniqueId()}`}
              />
            )}
          </Row>
          {isTypeOther && !isEmpty(comments) && <SRow>הערות: {comments}</SRow>}
        </Column>
      );
    });
  };

  return <Column>{renderItems()}</Column>;
}
