import { Stack } from "@mui/material";
import { useAuth } from "../../components/auth/auth";

export const Profile = () => {
  const { user } = useAuth();
  return (
    <Stack
      spacing={2}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      Hello {user}
    </Stack>
  );
};
