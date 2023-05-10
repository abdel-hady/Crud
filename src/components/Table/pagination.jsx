import { Button, Stack, Typography } from "@mui/material";

export const Pagination = ({ data }) => {
  const {
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
  } = data;
  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        p: "20px 32px",
      }}
    >
      <Typography>
        Page{" "}
        <strong>
          {pageIndex + 1}of {pageOptions?.length}
        </strong>{" "}
      </Typography>
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[10, 25, 100].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
      <Button
        direction="row"
        spacing={2}
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        {"<<"}
      </Button>
      <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
        prev
      </Button>
      <Button onClick={() => nextPage()} disabled={!canNextPage}>
        next
      </Button>
      <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {">>"}
      </Button>
    </Stack>
  );
};
