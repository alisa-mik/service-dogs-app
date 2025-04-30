import { Box, Checkbox, Typography } from "@mui/material";
import { useState } from "react";
import DateText from "./commonParts/DateText";
import { FamilyUpdateDetails } from "./FamilyUpdateDetails";

type Props = {
  update: any;
  onResolve: (updateId: string) => void;
};

const updateTypeTitles: Record<string, string> = {
  foodRequest: "הזמנת אוכל",
  gearRequest: "הזמנת ציוד",
  medicalUpdate: "דיווח רפואי",
  familyAway: "הזמנת פנסיון",
  familyNotice: "אחר",
};

export const FamilyUpdateItem = ({ update, onResolve }: Props) => {
  const [checked, setChecked] = useState(update.resolved || false);

  const title = updateTypeTitles[update.updateType] || "סוג פנייה לא ידוע";

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
        <Typography variant="subtitle1">{title}</Typography>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          disabled={checked}
        />
      </Box>

      <Typography variant="body2" color="textSecondary">
        עבור {update.dogName} ממחזור {update.groupId}
        <DateText date={update.createdAt} />
      </Typography>

      <FamilyUpdateDetails update={update} />
    </Box>
  );
};
