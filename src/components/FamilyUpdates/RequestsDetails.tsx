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
import { AnimatedItem } from "../commonParts/AnimatedItem";

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
    return [ ...requests ]
      .sort((a, b) => Number(a.resolved) - Number(b.resolved))
      .map((item) => {
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
          <AnimatedItem key={createdAt}>
            <Column gap="0px">
              <Row>
                <ResolveIcon checked={resolved} id={updateId} handleChange={handleResolve} />
                <Label>{dogName}</Label>
                <Label>
                  {contactName} {familyName}
                </Label>
                {!selectedGroupId && <Label>{groupId}</Label>}
                <DateText date={createdAt} />
              </Row>
              {showComments && !isEmpty(comments) && <SRow>הערות: {comments}</SRow>}
            </Column>
          </AnimatedItem>
        );
      });
  };

  return <Column>{renderItems()}</Column>;
}
