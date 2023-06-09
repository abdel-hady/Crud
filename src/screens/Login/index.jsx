import { useAuth } from "../../components/auth/auth-context";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Login = () => {
  const schema = yup.object({
    username: yup.string().required("username is required"),
  });
  const { register, formState, handleSubmit, watch } = useForm({
    defaultValues: {
      username: "",
    },
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/users";
  const onSubmit = () => {
    auth.login({username});
    navigate(redirectPath);
  };
  const username = watch("username");
  return (
    <Stack
      spacing={4}
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        height: "90vh",
      }}
      direction="column"
    >
      <Paper spacing={4} sx={{ padding: "64px", margin: "auto" }} elevation={4}>
        <Typography variant="h4">Login</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          spacing={2}
          direction="column"
        >
          <TextField
            sx={{ width: "400px" }}
            label="Username"
            type="username"
            {...register("username")}
            value={username}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
};
