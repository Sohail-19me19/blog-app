"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  ChangePasswordInput,
  useChangePassword,
} from "@src/api/user-profile";

import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

const ChangePassword = () => {
  const { mutateAsync: changePassword, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await changePassword(data);
      alert(res.message);
      reset();
    } catch (error: any) {
      alert(error.message);
    }
  });

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 4,
        mt: 4,
        bgcolor: "#1e1e1e",
        color: "#fff",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom textAlign="center">
        Change Password
      </Typography>

      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Old Password */}
        <TextField
          type="password"
          label="Old Password"
          {...register("oldPassword")}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword?.message}
          fullWidth
          InputLabelProps={{ style: { color: "#aaa" } }}
          InputProps={{
            style: { color: "#fff" },
          }}
        />

        {/* New Password */}
        <TextField
          type="password"
          label="New Password"
          {...register("newPassword")}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          fullWidth
          InputLabelProps={{ style: { color: "#aaa" } }}
          InputProps={{
            style: { color: "#fff" },
          }}
        />

        {/* Confirm Password */}
        <TextField
          type="password"
          label="Confirm Password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          fullWidth
          InputLabelProps={{ style: { color: "#aaa" } }}
          InputProps={{
            style: { color: "#fff" },
          }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          sx={{
            py: 1.2,
            fontWeight: "bold",
            mt: 1,
            color: "#fff",
            bgcolor: "#1976d2",
          }}
        >
          {isPending ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Change Password"
          )}
        </Button>
      </Box>
    </Paper>
  );
};

export default ChangePassword;
