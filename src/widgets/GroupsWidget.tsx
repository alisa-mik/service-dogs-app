import { useEffect, useState } from "react";
import { Button } from "../components/commonParts/Buttons";
import CustomDialog from "../components/CustomDialog";
import TrainingGroupForm from "../components/TrainingGroupForm";
import GroupList from "./GroupsList";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import {
  selectSelectedGroupId,
  setFirstGroup,
} from "../store/trainingGroupsSlice";

export default function GroupsWidget({
  showAddGroup = true,
  showAllOption = false,
  allowDelete = false,
}) {
  const [ open, setOpen ] = useState<boolean>(false);
  const selectedGroupId = useSelector(selectSelectedGroupId);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    !selectedGroupId && !showAllOption && dispatch(setFirstGroup());
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const data = {
    groupId: "",
    startDate: "",
    endDate: "",
    active: true,
    dogIds: [],
    familyIds: [],
    meetings: [],
    updates: [],
  };

  const renderAddGroup = () => {
    if (!showAddGroup) return null;

    return (
      <Button onClick={() => setOpen(true)} padding={"2px 8px"}>
        <AddIcon />
      </Button>
    );
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>קבוצות</WidgetTitle>
        {renderAddGroup()}
      </WidgetHeader>
      <WidgetBody>
        <CustomDialog
          onClose={handleClose}
          open={open}
          title="הוספת קבוצה חדשה"
        >
          <TrainingGroupForm onClose={handleClose} data={data} />
        </CustomDialog>
        <GroupList showAllOption={showAllOption} allowDelete={allowDelete} />
      </WidgetBody>
    </>
  );
}
