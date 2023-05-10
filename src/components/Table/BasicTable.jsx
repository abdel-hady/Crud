import { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import db from "../../../db.json";
import { COLUMNS } from "../columns";
import { useRowSelect } from "react-table/dist/react-table.development";
import {
  Checkbox,
  Paper,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Pagination } from "./pagination";
import { StyledTableCell } from "./StyledTable";
import { DeleteButton } from "./DeleteButton";
import { TableContaint } from "./TableContaint";
export const PaginationTable = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      textDecoration: "none",
      color: isActive ? "#001abede" : "#eee",
      borderBottom: isActive ? "2px solid #001abede" : "#eee",
      padding: "10px",
    };
  };
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => db.users, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    state,
    gotoPage,
    pageCount,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },

    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const { pageIndex, pageSize } = state;
  return (
    <>
      <Stack
        spacing={4}
        direction="row"
        sx={{ display: "flex", justifyContent: "flex-end", mx: 4 }}
      >
        <DeleteButton selectedFlatRows={selectedFlatRows} />
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

      <Stack>
        <TableContainer component={Paper} sx={{ width: "95%", margin: "auto" }}>
          <Table aria-label="customized table" {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <StyledTableCell {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </StyledTableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableContaint
              headerGroups={headerGroups}
              getTableBodyProps={getTableBodyProps}
              page={page}
              prepareRow={prepareRow}
            />
          </Table>
        </TableContainer>
      </Stack>
      <Pagination
        data={{
          nextPage,
          previousPage,
          canNextPage,
          canPreviousPage,
          pageOptions,
          setPageSize,
          gotoPage,
          pageCount,
          pageIndex,
          pageSize,
        }}
      />
    </>
  );
};
