"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { ImageInput, userImageSchema } from "@src/api/user-profile/dto";
import { useUpdateImage } from "@src/api/user-profile";
import { useSession } from "next-auth/react";

import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";

export default function ChangeImage() {
  const { mutateAsync: updateImage, isPending } = useUpdateImage();
  const { data: session, update } = useSession();

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ImageInput>({
    resolver: zodResolver(userImageSchema),
    defaultValues: {} as any,
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedUser = await updateImage(data);

      await update({
        user: {
          ...session?.user,
          image: updatedUser.image,
        },
      });

      reset();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
        setPreview(null);
      }
    } catch (err) {
      console.error(err);
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
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
          Upload Profile Image
        </Typography>

        {/* Image Preview */}
        <Box
          onClick={() => fileInputRef.current?.click()}
          sx={{
            width: 192,
            height: 192,
            mx: "auto",
            border: preview ? "2px solid #ccc" : "2px dashed #777",
            borderRadius: 2,
            overflow: "hidden",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": { borderColor: "#2196f3" },
          }}
        >
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              width={192}
              height={192}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          ) : (
            <Typography variant="body2" color="gray">
              Click to choose image
            </Typography>
          )}
        </Box>

        {/* File Input (hidden) */}
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          ref={(e) => {
            register("image").ref(e);
            fileInputRef.current = e;
          }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setPreview(URL.createObjectURL(file));
              reset({ image: file });
            }
          }}
          style={{ display: "none" }}
        />

        {/* Error Message */}
        {errors.image && (
          <Typography variant="body2" color="error">
            {errors.image.message?.toString()}
          </Typography>
        )}

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
            bgcolor: "#1976d2",
            color: "#fff",
          }}
        >
          {isPending ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Upload Image"
          )}
        </Button>
      </form>
    </Paper>
  );
}
