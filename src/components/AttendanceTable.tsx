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
  const groupDogs = useSelector(selectSelectedGroupDogs) || [];
  const groupUpdates = useSelector(selectSelectedGroupUpdates) || [];
  const [ enrichUpdates, setEnrichUpdates ] = useState<any>([]);

  useEffect(() => {
    if (!groupUpdates.length || !groupDogs.length) {
      // setEnrichUpdates([]);
      return;
    }

    const attendanceUpdates = groupUpdates.filter(
      (update) => update.type === "meeting"
    );

    const enrich = attendanceUpdates.map((en) => {
      return groupDogs.reduce(
        (res, dog) => {
          return {
            ...res,
            [ dog.dogName ]: en.attendance?.includes(dog.dogId),
          };
        },
        { id: en.date, date: en.date }
      );
    });

    setEnrichUpdates(enrich);
  }, [ groupUpdates, groupDogs ]);

  const getColumns = () => {
    const columns: GridColDef[] = [
      {
        field: "date",
        headerName: "תאריך פגישה",
        width: 150,
        valueGetter: (_, row) => formatDateFromSeconds(row.date),
      },
    ];

    groupDogs.forEach((dog) => {
      columns.push({
        field: dog.dogName,
        headerName: dog.dogName,
        minWidth: 80,
        maxWidth: 120,
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
