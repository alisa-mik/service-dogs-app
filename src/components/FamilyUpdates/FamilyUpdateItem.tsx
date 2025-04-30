import { Box, Checkbox } from "@mui/material";
import { useState } from "react";
import DateText from "../commonParts/DateText";
import { FamilyUpdateDetails } from "./FamilyUpdateDetails";
import { updateTypeTitles } from "../../utils/familyUpdatesUtils";
import { Column, Row } from "../commonParts/Layouts";

type Props = {
  update: any;
  onResolve: (updateId: string) => void;
  viewMode: string;
};

export const FamilyUpdateItem = ({ update, onResolve, viewMode }: Props) => {
  const [checked, setChecked] = useState(update.resolved || false);

  const title = updateTypeTitles[update.updateType] || "סוג פנייה לא ידוע";
  console.log({ viewMode });

  const handleChange = () => {
    setChecked(true);
    onResolve(update.updateId);
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
        marginBottom: 2,
        backgroundColor: checked ? "#f5f5f5" : "#fff",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Row gap="5px">
          {viewMode !== "type" && <div>{title}</div>}
          <div>עבור {update.dogName}</div>
          {viewMode !== "group" && <div> ממחזור {update.groupId}</div>}
        </Row>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          disabled={checked}
        />
      </Box>

      <Column gap="8px">
        <FamilyUpdateDetails update={update} />
        <DateText date={update.createdAt} />
      </Column>
    </Box>
  );
};
