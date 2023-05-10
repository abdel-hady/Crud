import { TableBody } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./StyledTable";

export const TableContaint = ({
  headerGroups,
  getTableBodyProps,
  page,
  prepareRow,
}) => {
  return (
    <TableBody {...getTableBodyProps()}>
      {page.map((row) => {
        prepareRow(row);
        return (
          <StyledTableRow {...row.getRowProps()}>
            {row.cells.map((cell) => (
              <StyledTableCell {...cell.getCellProps()}>
                {cell.render("Cell")}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        );
      })}
    </TableBody>
  );
};
