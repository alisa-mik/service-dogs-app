import { Box } from "@mui/material";
import DateText from "../commonParts/DateText";
import { FamilyUpdateDetails } from "./FamilyUpdateDetails";
import { updateTypeTitles } from "../../utils/familyUpdatesUtils";
import { Column, Row } from "../commonParts/Layouts";
import { ResolveRequestIcon } from "./ResolveRequestIcon";

type Props = {
  update: any;
  viewMode: string;
};

export const FamilyUpdateItem = ({ update, viewMode }: Props) => {
  const title = updateTypeTitles[update.updateType] || "סוג פנייה לא ידוע";

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
        marginBottom: 2,
        backgroundColor: update.resolved ? "#f5f5f5" : "#fff",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Row gap="5px">
          {viewMode !== "type" && <div>{title}</div>}
          <div>עבור {update.dogName}</div>
          {viewMode !== "group" && <div> ממחזור {update.groupId}</div>}
        </Row>
        <ResolveRequestIcon
          resolved={update.resolved}
          updateId={update.updateId}
        />
      </Box>

      <Column gap="8px">
        <FamilyUpdateDetails update={update} />
        <DateText date={update.createdAt} />
      </Column>
    </Box>
  );
};
