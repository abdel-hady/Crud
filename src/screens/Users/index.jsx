import { Stack } from "@mui/material";
import { PaginationTable } from "../../components/Table/BasicTable";
export const Users = () => {
  return (
    <>
      <Stack spacing={2}>
        <PaginationTable />
      </Stack>
    </>
  );
};
