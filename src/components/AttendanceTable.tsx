/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { formatDateFromSeconds } from "../utils/converts";
import { useSelector } from "react-redux";
import { Table } from "./table/Table";
import VCell from "./table/VCell";
import { Center } from "./commonParts/Layouts";
import { isEmpty } from "lodash";
import {
  selectSelectedGroupDogs,
  selectSelectedGroupUpdates,
} from "../store/trainingGroupsSlice";

const AttendanceTable: React.FC = () => {
  const gruopDogs = useSelector(selectSelectedGroupDogs);
  const groupUpdates = useSelector(selectSelectedGroupUpdates);
  const [enrichUpdates, setEnrichUpdates] = useState<any>([]);

  useEffect(() => {
    const attendanceUpdates = groupUpdates.filter(
      (update) => update.type === "meeting"
    );

    const enrich = attendanceUpdates.map((en) => {
      return gruopDogs.reduce(
        (res, dog) => {
          return {
            ...res,
            [dog.dogName]: en.attendance?.includes(dog.dogId),
          };
        },
        { id: en.date, date: en.date }
      );
    });

    setEnrichUpdates(enrich);
  }, [groupUpdates, gruopDogs]);

  const getColumns = () => {
    const columns: GridColDef[] = [
      {
        field: "date",
        headerName: "תאריך פגישה",
        width: 150,
        valueGetter: (value, row) => formatDateFromSeconds(row.date),
      },
    ];

    gruopDogs.forEach((dog) => {
      columns.push({
        field: dog.dogName,
        headerName: dog.dogName,
        width: 120,
        renderCell: VCell,
        sortable: false,
      });
    });

    return columns;
  };

  if (isEmpty(enrichUpdates)) return <Center>לא נרשמו מפגשים</Center>;

  return <Table hideFooter columns={getColumns()} rows={enrichUpdates} />;
};

export default AttendanceTable;
