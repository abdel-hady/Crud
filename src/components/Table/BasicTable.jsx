import { useTable, usePagination } from "react-table";
import { useRowSelect } from "react-table/dist/react-table.development";
import {
  Checkbox,
  Paper,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Pagination } from "./pagination";
import { StyledTableCell } from "./StyledTable";
import { TableContaint } from "./TableContaint";
import { useEffect } from "react";

export const PaginationTable = ({ data, columns, onSelectedRowsChange }) => {
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
  useEffect(() => {
    onSelectedRowsChange(selectedFlatRows);
  }, [selectedFlatRows, onSelectedRowsChange]);
  const { pageIndex, pageSize } = state;
  return (
    <>
      <Stack>
        <TableContainer
          component={Paper}
          sx={{ width: "95%", margin: "30px auto" }}
        >
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
