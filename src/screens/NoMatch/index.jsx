import { Stack } from "@mui/material";

export const NoMatch = () => {
  return (
    <Stack
      component="h1"
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        height: "90vh",
      }}
    >
      | 404 Page Not Found{" "}
    </Stack>
  );
};
