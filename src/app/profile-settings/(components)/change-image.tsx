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

// converts File to base64 string
const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

export default function ChangeImage() {
  const { mutateAsync: updateImage, isPending } = useUpdateImage();
  const { data: session, update } = useSession();

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // store the actual File separately
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ImageInput>({
    resolver: zodResolver(userImageSchema),
  });

  const onSubmit = handleSubmit(async () => {
    try {
      if (!selectedFile) {
        setError("image", { message: "Image file is required" });
        return;
      }

      // convert File to base64 here on the client before sending to server action
      const base64 = await toBase64(selectedFile);

      const updatedUser = await updateImage({ image: base64 });

      await update({
        user: {
          ...session?.user,
          image: updatedUser.image,
        },
      });

      reset();
      setSelectedFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
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

        {/* File input — just stores file in state, does NOT pass File to react-hook-form */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setSelectedFile(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
          style={{ display: "none" }}
        />

        {errors.image && (
          <Typography variant="body2" color="error">
            {errors.image.message?.toString()}
          </Typography>
        )}

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
