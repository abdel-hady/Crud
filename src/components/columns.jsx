import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Action",
    Cell: ({ row }) => (
      <Link to={`/edit-user/${row.original.id}`}>
        <Button color="primary" variant="outlined">
          Update
        </Button>
      </Link>
    ),
  },
];
