"use client";

import {
  useDeleteBlog,
  useEditDescBlog,
  useEditStatusBlog,
  useEditTitleBlog,
  useGetUserBlogs,
} from "@src/api";
import { makeBlogSlug } from "@src/helpers";
import DeleteIcon from "@mui/icons-material/Delete";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  FormControlLabel,
  List,
  ListItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

const Blogs = () => {
  const { data: blogs, isPending } = useGetUserBlogs();
  const { mutateAsync: eidtTitle, isPending: editingTitle } =
    useEditTitleBlog();
  const { mutateAsync: editDesc, isPending: editingDesc } = useEditDescBlog();
  const { mutateAsync: editStatus, isPending: editingStatus } =
    useEditStatusBlog();
  const { mutateAsync: deleteBlog } = useDeleteBlog();
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  if (isPending)
    return (
      <Box className="flex items-center justify-center h-screen">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "5rem",
            width: "5rem",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              borderRadius: "50%",
              borderBottom: "1px solid",
              borderColor: "grey.100",
              animation: "spin 1s linear infinite",
              "@keyframes spin": {
                from: { transform: "rotate(0deg)" },
                to: { transform: "rotate(360deg)" },
              },
            }}
          ></Box>

          <Image
            src="/images/icon.png"
            width={40}
            height={40}
            alt="loading"
            className="bg-white rounded-full"
          />
        </Box>
      </Box>
    );

  const filteredBlogs =
    filter === "all" ? blogs : blogs?.filter((b) => b.status === filter);

  return (
    <Box sx={{ py: 6 }}>
      <Box sx={{ maxWidth: "896px", mx: "auto" }}>
        <Typography variant="h4" fontWeight="bold" marginBottom={4}>
          My Blogs
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <Button
            onClick={() => setFilter("all")}
            disableRipple
            sx={{
              fontWeight: 600,
              transition: "color 0.2s",
              borderBottom: filter === "all" ? "2px solid white" : "none",
              color: filter === "all" ? "white" : "#606060",
              borderRadius: "0",
              p: 0,
              "&:hover": {
                color: "white",
                bgcolor: "transparent",
              },
            }}
          >
            Total
          </Button>

          <Button
            onClick={() => setFilter("published")}
            disableRipple
            sx={{
              fontWeight: 600,
              transition: "color 0.2s",
              borderBottom: filter === "published" ? "2px solid white" : "none",
              color: filter === "published" ? "white" : "#606060",
              borderRadius: "0",
              p: 0,
              "&:hover": {
                color: "white",
                bgcolor: "transparent",
              },
            }}
          >
            Published
          </Button>

          <Button
            onClick={() => setFilter("draft")}
            disableRipple
            sx={{
              fontWeight: 600,
              transition: "color 0.2s",
              borderBottom: filter === "draft" ? "2px solid white" : "none",
              color: filter === "draft" ? "white" : "#606060",
              borderRadius: "0",
              p: 0,
              "&:hover": {
                color: "white",
                bgcolor: "transparent",
              },
            }}
          >
            Drafts
          </Button>
        </Box>

        <List sx={{ "&>*": { marginBottom: "1.5rem" } }}>
          {filteredBlogs?.map((blog) => (
            <ListItem
              key={blog.id}
              sx={{
                bgcolor: "#222222",
                borderRadius: 4,
                p: 3,
                boxShadow: "0 -1px 2px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.2s ease",
                alignItems: "stretch",
                "&:hover": {
                  boxShadow: "0 -4px 6px rgba(0,0,0,0.2)",
                },
              }}
            >
              <Box sx={{ width: "100%", "&>*": { mraginBottom: ".75rem" } }}>
                <TextField
                  disabled={editingTitle}
                  defaultValue={blog.title}
                  onBlur={async (e) => {
                    const newTitle = e.target.value.trim();
                    if (newTitle && newTitle !== blog.title) {
                      await eidtTitle({ id: blog.id, title: newTitle });
                    }
                  }}
                  variant="standard"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      color: "#e5e7eb",
                      backgroundColor: "transparent",
                      borderBottom: "1px solid transparent",
                      mb: "0.5rem",
                      "&:focus-within": {
                        borderBottom: "1px solid #808080",
                      },
                    },
                  }}
                />
                <TextField
                  disabled={editingDesc}
                  defaultValue={blog.description}
                  multiline
                  onBlur={async (e) => {
                    const newDesc = e.target.value.trim();
                    if (newDesc && newDesc !== blog.description) {
                      await editDesc({ id: blog.id, description: newDesc });
                    }
                  }}
                  variant="outlined"
                  fullWidth
                  rows={2}
                  sx={{
                    "& fieldset": { border: "none" },

                    textarea: {
                      color: "#808080",
                      fontSize: "1rem",
                      resize: "none",
                    },
                    bgcolor: "transparent",
                    border: "1px solid transparent",
                    outline: "none",
                    "&:focus-within": {
                      border: "1px solid #808080",
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: ".85rem",
                    color: "#606060",
                    borderTop: "1px solid #808080",
                    pt: ".7rem",
                  }}
                >
                  <Typography variant="body2" className="capitalize">
                    {blog.status}
                  </Typography>
                  <Typography variant="body2">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Typography>
                  <Link
                    className="underline hover:text-gray-200"
                    href={`/blog-detail/${makeBlogSlug(blog.title, blog.id)}`}
                  >
                    see details?
                  </Link>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  ml: 2,
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      disabled={editingStatus}
                      checked={blog.status === "published"}
                      onChange={async (e) => {
                        await editStatus({
                          id: blog.id,
                          status: e.target.checked ? "published" : "draft",
                        });
                      }}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#fff",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
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
                  label=""
                />

                <Button
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 2,
                    color: "#ff4232",
                    "&:hover": { bgcolor: "#252525", color: "#606060" },
                  }}
                  className="  hover:cursor-pointer rounded"
                  onClick={() => deleteBlog(blog.id)}
                >
                  <DeleteIcon fontSize="large" />
                </Button>
              </Box>
            </ListItem>
          ))}

          {filteredBlogs?.length === 0 && (
            <ListItem sx={{ textAlign: "center", color: "#606060" }}>
              No blogs found.
            </ListItem>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default Blogs;
