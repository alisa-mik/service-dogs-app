import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "./table/Table";
import { Center } from "./commonParts/Layouts";
import {
  selectFamiliesArray,
  selectSelectedFamilyId,
  setSelectedFamily,
} from "../store/familiesSlice";

export const FamiliesTable: React.FC<{ searchTerm: string }> = ({
  searchTerm,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedFamilyId = useSelector(selectSelectedFamilyId);
  const families = useSelector(selectFamiliesArray);

  const filteredFamilies = families.filter(
    (f) =>
      f.familyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.contactName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectFamily = (id: string) => {
    dispatch(setSelectedFamily(id));
  };

  const renderTable = () => {
    const commonProps = { flex: 0.2 };

    const columns: GridColDef[] = [
      {
        ...commonProps,
        field: "familyName",
        headerName: "שם משפחה",
      },
      {
        ...commonProps,
        field: "contactName",
        headerName: "איש קשר",
      },

      {
        ...commonProps,
        field: "phoneNumber",
        headerName: "טלפון",
        flex: 0.3,
        valueGetter: (_, row) => `${row.contactInfo.phoneNumber}`,
      },
      {
        ...commonProps,
        field: "city",
        headerName: "עיר",
        valueGetter: (_, row) => `${row.contactInfo.city}`,
      },
      {
        ...commonProps,
        field: "email",
        flex: 0.4,
        headerName: "מייל",
        valueGetter: (_, row) => `${row.contactInfo.email}`,
      },

      //   {
      //     ...commonProps,
      //     field: "birthDate",
      //     headerName: "תאריך לידה",
      //     flex: 0.8,
      //     valueGetter: (value) =>
      //       `${value ? formatDateFromSeconds(value) : "-"}`,
      //   },
    ];

    if (filteredFamilies.length === 0)
      return <Center>אין משפחות במערכת</Center>;

    return (
      <Table
        columns={columns}
        rows={filteredFamilies.reverse()}
        hideFooter={false}
        selected={selectedFamilyId}
        onRowClick={({ id }) => {
          handleSelectFamily(id as string);
        }}
      />
    );
  };

  return <>{renderTable()}</>;
};
