import DateText from "../commonParts/DateText";
import { FamilyUpdateDetails } from "./FamilyUpdateDetails";
import { updateTypeTitles } from "../../utils/familyUpdatesUtils";
import { Column, Row } from "../commonParts/Layouts";
import { ResolveIcon } from "./ResolveIcon";
import { useFamilyUpdateResolve } from "../../hooks/useFamilyUpdateResolve";
import { AnimatedItem } from "../commonParts/AnimatedItem";
import styled from "styled-components";

const UpdateContainer = styled.div<{ $resolved: boolean }>`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: ${({ $resolved }) => ($resolved ? "#f5f5f5" : "#fff")};
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

type Props = {
  update: any;
  viewMode: string;
};

export const FamilyUpdateItem = ({ update, viewMode }: Props) => {
  const { handleResolve } = useFamilyUpdateResolve();
  const title = updateTypeTitles[ update.updateType ] || "סוג פנייה לא ידוע";

  return (
    <AnimatedItem>
      <UpdateContainer $resolved={update.resolved}>
        <HeaderRow>
          <Row gap="5px">
            {viewMode !== "type" && <div>{title}</div>}
            <div>עבור {update.dogName}</div>
            {viewMode !== "group" && <div> ממחזור {update.groupId}</div>}
          </Row>
          <ResolveIcon
            checked={update.resolved}
            id={update.updateId}
            handleChange={handleResolve}
          />
        </HeaderRow>

        <Column gap="8px">
          <FamilyUpdateDetails update={update} />
          <DateText date={update.createdAt} />
        </Column>
      </UpdateContainer>
    </AnimatedItem>
  );
};
