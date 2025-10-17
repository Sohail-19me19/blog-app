"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { InfoInput, UserInfoShema, useUpdateInfo } from "@src/api/user-profile";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const ChangeInfo = () => {
  const { data: session, update } = useSession();
  const { mutateAsync: updateInfo, isPending } = useUpdateInfo();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InfoInput>({
    resolver: zodResolver(UserInfoShema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedInfo = await updateInfo(data);
      await update({
        user: {
          ...session?.user,
          name: updatedInfo.name,
          email: updatedInfo.email,
        },
      });
      reset(data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        bgcolor: "#1e1e1e",
        color: "#fff",
        maxWidth: 500,
        mx: "auto",
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }} align="center">
        Update Your Info
      </Typography>

      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Name Field */}
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          defaultValue={session?.user?.name || ""}
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{
            "& .MuiInputBase-root": { color: "#fff" },
            "& .MuiInputLabel-root": { color: "#aaa" },
            "& .MuiOutlinedInput-root fieldset": { borderColor: "#666" },
            "& .MuiOutlinedInput-root:hover fieldset": { borderColor: "#fff" },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "#fff",
            },
          }}
        />

        {/* Email Field */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          defaultValue={session?.user?.email || ""}
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{
            "& .MuiInputBase-root": { color: "#fff" },
            "& .MuiInputLabel-root": { color: "#aaa" },
            "& .MuiOutlinedInput-root fieldset": { borderColor: "#666" },
            "& .MuiOutlinedInput-root:hover fieldset": { borderColor: "#fff" },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "#fff",
            },
          }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          sx={{
            borderRadius: 2,
            py: 1,
            fontWeight: "bold",
            textTransform: "none",
            color: "#fff",
            bgcolor: "#1976d2",
          }}
        >
          {isPending ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Change Info"
          )}
        </Button>
      </Box>
    </Paper>
  );
};

export default ChangeInfo;
