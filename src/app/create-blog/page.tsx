"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useAddBlog } from "@src/api";
import { BlogInput, Blogschema } from "@src/api/blogs/dto";
import React from "react";
import { useForm } from "react-hook-form";

const CreateBlog = () => {
  const { mutateAsync: addBlog, isPending: isAdding } = useAddBlog();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<BlogInput>({
    resolver: zodResolver(Blogschema),
    defaultValues: { title: "", description: "", status: "draft" },
  });

  const onSubmit = handleSubmit(async (values) => {
    await addBlog(values);
    reset();
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 2,
      }}
    >
      <form
        onSubmit={onSubmit}
        className="bg-[#222222] shadow-lg rounded-2xl w-full max-w-lg p-6 "
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
        >
          Create a blog post
        </Typography>

        <TextField
          label="Title"
          placeholder="Blog Title"
          variant="outlined"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{
            mb: 3,
            width: "100%",
            "& .MuiInputLabel-root": {
              color: "#606060",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#fff",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#606060",
              },
              "&:hover fieldset": {
                borderColor: "#606060",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fff",
              },
            },
          }}
        />

        <TextField
          label="Description"
          placeholder="Describe your story..."
          multiline
          {...register("description")}
          variant="outlined"
          error={!!errors.description}
          helperText={errors.description?.message}
          rows={3}
          sx={{
            mb: 1,
            width: "100%",
            "& .MuiInputLabel-root": {
              color: "#606060",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#fff",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#606060",
              },
              "&:hover fieldset": {
                borderColor: "#606060",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fff",
              },
            },
          }}
        />

        <FormControlLabel
          label={watch("status") === "published" ? "Published" : "Draft"}
          control={
            <Switch
              checked={watch("status") === "published"}
              onChange={(e) => {
                setValue("status", e.target.checked ? "published" : "draft");
              }}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#fff",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#0099ff",
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "#606060",
                },
                "& .MuiSwitch-thumb": {
                  color: "#f5f5f5",
                },
              }}
            />
          }
          sx={{
            alignItems: "center",
            mb: 2,
            "& .MuiTypography-root": {
              fontSize: "0.9rem",
              lineHeight: "1.2",
              color: "#fff",
            },
            "& .MuiFormControlLabel-label": {
              display: "flex",
              alignItems: "center",
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isAdding}
          sx={{ width: "100%", py: 1.5, color: "#fff", bgcolor: "#1976d2" }}
        >
          {isAdding ? (
            <CircularProgress size={25} thickness={5} color="primary" />
          ) : (
            "Publish"
          )}
        </Button>
      </form>
    </Box>
  );
};

export default CreateBlog;
