import { Button } from "@mui/material";
import { useQueryClient, useMutation } from "react-query";
import { client } from "../../utils/api-client";

export const DeleteButton = ({ selectedFlatRows }) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    (ids) => client(`users/${ids.join(",")}`, { method: "DELETE" }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  const handleDelete = async () => {
    try {
      const ids = selectedFlatRows.map((row) => row.original.id);
      await mutateAsync(ids);
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
