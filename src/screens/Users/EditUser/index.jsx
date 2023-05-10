import { useState, useEffect } from "react";
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
import { request } from "../../../utils/axios-utils";

export const EditUser = () => {
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
  });
  const [loading, setLoading] = useState(false);
  const first_name = watch("first_name", "");
  const email = watch("email", "");
  const gender = watch("gender", "");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await request({ url: `/users/${id}`, method: "get" });
        const user = response.data;
        reset(user);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    fetchUser();
  }, [id, reset]);

  const onSubmit = async ({ first_name, email, gender }) => {
    
      setLoading(true);
      await request({
        url: `/users/${id}`,
        method: "put",
        data: { first_name, email, gender },
      }).then(()=>{
        setLoading(false);
        reset();
        navigate("/users");
      }).catch (error=>{
        setLoading(false);
        console.error(error);
      }) 
    
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
              defaultValue={reset.email}
              {...register("email", {
                required: "Email is required",
              })}
              value={email}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Gender"
              type="text"
              {...register("gender", {
                required: "Gender is required",
              })}
              value={gender}
              error={!!errors.gender}
              helperText={errors.gender?.message}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
};
