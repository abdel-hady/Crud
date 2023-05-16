import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Stack,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "react-query";
import { client } from "../../../utils/api-client";

export const EditUser = () => {
  const schema = yup.object({
    first_name: yup.string().required("First name is required"),
    email: yup
      .string()
      .email("Email format is not valid")
      .required("Email is required"),
    gender: yup.string().required("gender is required"),
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      first_name: "",
      email: "",
      gender: "",
    },
    resolver: yupResolver(schema),
  });
  const first_name = watch("first_name", "");
  const email = watch("email", "");
  const gender = watch("gender", "");
  const { data: user } = useQuery(`/users/${id}`, () => client(`users/${id}`), {
    enabled: !!id,
  });

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const { mutate } = useMutation((data) =>
    client(`users/${id}`, { data, method: "PUT" })
  );

  const onSubmit = async ({ first_name, email, gender }) => {
    try {
      await mutate({ first_name, email, gender });
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
      <Paper
        spacing={4}
        sx={{ padding: "64px", margin: "auto", width: 400 }}
        elevation={4}
      >
        <Typography variant="h4">Edit User</Typography>
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
          <Stack spacing={2} width={400}>
            <TextField
              label="First Name"
              type="text"
              {...register("first_name")}
              value={first_name}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />
            <TextField
              label="Email"
              type="email"
              defaultValue={reset.email}
              {...register("email")}
              value={email}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Gender"
              type="text"
              {...register("gender")}
              value={gender}
              error={!!errors.gender}
              helperText={errors.gender?.message}
            />
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
};
