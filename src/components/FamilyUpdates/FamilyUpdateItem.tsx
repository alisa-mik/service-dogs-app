import { Box, Checkbox } from "@mui/material";
import { useState } from "react";
import DateText from "../commonParts/DateText";
import { FamilyUpdateDetails } from "./FamilyUpdateDetails";
import { updateTypeTitles } from "../../utils/familyUpdatesUtils";
import { Column, Row } from "../commonParts/Layouts";

type Props = {
  update: any;
  onResolve: (updateId: string, resolved: boolean) => void;
  viewMode: string;
};

export const FamilyUpdateItem = ({ update, onResolve, viewMode }: Props) => {
  const title = updateTypeTitles[update.updateType] || "סוג פנייה לא ידוע";

  const handleChange = () => {
    onResolve(update.updateId, !update.resolved);
  };

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
        <Checkbox checked={update.resolved} onChange={handleChange} />
      </Box>

      <Column gap="8px">
        <FamilyUpdateDetails update={update} />
        <DateText date={update.createdAt} />
      </Column>
    </Box>
  );
};
