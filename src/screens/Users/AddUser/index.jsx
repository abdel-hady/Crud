import {
  TextField,
  Button,
  Stack,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUsersData } from "../../../Hooks/useUsersData";
export const AddUser = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      first_name: "",
      email: "",
      gender: "",
    },
  });

  const { register, handleSubmit, watch, formState, reset } = form;
  const first_name = watch("first_name", "");
  const email = watch("email", "");
  const gender = watch("gender", "");

  const { errors } = formState;
  const { mutate, isLoading } = useUsersData({ first_name, email, gender });

  const onSubmit = async (data) => {
    await mutate(data)
      .then(() => {
        reset();
        navigate("/users");
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
      <Paper sx={{ padding: "64px", margin: "auto", width: 400 }} elevation={4}>
        <Typography variant="h4">Add User</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          width="100%"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack spacing={2} width={350}>
            <TextField
              label="F-name"
              type="first_name"
              {...register("first_name", {
                required: "First name is required",
              })}
              value={first_name}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />
            <TextField
              label="Email"
              type="email"
              {...register("email", {
                required: "Email name is required",
              })}
              value={email}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="gender"
              type="gender"
              {...register("gender", {
                required: "gender is required",
              })}
              value={gender}
              error={!!errors.gender}
              helperText={errors.gender?.message}
            />
            <Button
              disabled={isLoading}
              type="submit"
              variant="contained"
              color="primary"
            >
              {isLoading ? "Adding..." : "Add"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
};
