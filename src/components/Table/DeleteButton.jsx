import { Button } from "@mui/material";
import { useDeleteUsers } from "../../Hooks/useUsersData";

export const DeleteButton = ({ selectedFlatRows }) => {
  const { mutateAsync, isLoading } = useDeleteUsers();

  const handleDelete = async () => {
    try {
      await mutateAsync(selectedFlatRows.map((row) => row.original.id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ width: 300 }}
      onClick={handleDelete}
      disabled={isLoading}
    >
      {isLoading ? "Deleting..." : "Delete selected rows"}
    </Button>
  );
};
