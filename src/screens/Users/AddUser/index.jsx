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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { client } from "../../../utils/api-client";
import { useMutation } from "react-query";
export const AddUser = () => {
  const schema = yup.object({
    first_name: yup.string().required("First name is required"),
    email: yup
      .string()
      .email("Email format is not valid")
      .required("Email is required"),
    gender: yup.string().required("gender is required"),
  });
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      first_name: "",
      email: "",
      gender: "",
    },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, watch, formState, reset } = form;
  const first_name = watch("first_name", "");
  const email = watch("email", "");
  const gender = watch("gender", "");

  const { errors } = formState;
  const { mutate, isLoading } = useMutation(({ first_name, email, gender }) =>
    client(`users`, {
      method: "POST",
      data: { first_name, email, gender },
    })
  );

  const onSubmit = async (data) => {
    try {
      await mutate(data);

      reset();
      navigate("/users");
    } catch (error) {
      console.error(error);
    }
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
              {...register("first_name")}
              value={first_name}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />
            <TextField
              label="Email"
              type="email"
              {...register("email")}
              value={email}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="gender"
              type="gender"
              {...register("gender")}
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
