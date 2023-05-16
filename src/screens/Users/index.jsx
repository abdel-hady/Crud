import { Stack, Typography } from "@mui/material";
import { PaginationTable } from "../../components/Table/BasicTable";
import db from "../../../db.json";
import { COLUMNS } from "../../components/columns";
import { useMemo, useState } from "react";
import { DeleteButton } from "../../components/Table/DeleteButton";
import { NavLink } from "react-router-dom";

export const Users = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      textDecoration: "none",
      color: isActive ? "#001abede" : "#eee",
      borderBottom: isActive ? "2px solid #001abede" : "#eee",
      padding: "10px",
    };
  };
  const data = useMemo(() => db.users, [db.users]);
  const columns = useMemo(() => COLUMNS, []);

  const [selectedRows, setSelectedRows] = useState([]);

  function handleSelectedRowsChange(rows) {
    setSelectedRows(rows);
  }
  return (
    <>
      <Stack
        spacing={4}
        direction="row"
        sx={{ display: "flex", justifyContent: "flex-end", mx: 4 }}
      >
        <DeleteButton selectedFlatRows={selectedRows} />
        <Typography
          variant="h6"
          sx={{
            bgcolor: "#1976d2",
            borderRadius: "6px",
            color: "#eee",
            mb: 1,
          }}
        >
          <NavLink style={navLinkStyles} variant="Link" to="/add-user">
            Add User
          </NavLink>
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <PaginationTable
          data={data}
          columns={columns}
          onSelectedRowsChange={handleSelectedRowsChange}
        />
      </Stack>
    </>
  );
};
