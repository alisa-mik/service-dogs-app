import { isEmpty } from "lodash";
import { RequestInfo } from "../../types/familyUpdateTypes";
import DateText from "../commonParts/DateText";
import { Label } from "../commonParts/Labels";
import { Column, Row } from "../commonParts/Layouts";
import styled from "styled-components";
import { PAINTED_PONY } from "../../config/colors";
import { useSelector } from "react-redux";
import { selectSelectedGroupId } from "../../store/trainingGroupsSlice";
import { ResolveIcon } from "./ResolveIcon";
import { useFamilyUpdateResolve } from "../../hooks/useFamilyUpdateResolve";

interface RequestsDetailsProps {
  requests: RequestInfo[];
  showComments: boolean;
}

const SRow = styled(Row)`
  color: ${PAINTED_PONY};
`;

export function RequestsDetails({
  requests,
  showComments,
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

      return (
        <Column gap="0px" key={createdAt}>
          <Row>
            <Label>{dogName}</Label>
            <Label>
              {contactName} {familyName}
            </Label>
            {!selectedGroupId && <Label>{groupId}</Label>}
            <DateText date={createdAt} />

            <ResolveIcon checked={resolved} id={updateId} handleChange={handleResolve} />
          </Row>
          {showComments && !isEmpty(comments) && <SRow>הערות: {comments}</SRow>}
        </Column>
      );
    });
  };

  return <Column>{renderItems()}</Column>;
}
