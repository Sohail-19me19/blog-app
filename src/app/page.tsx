"use client";
import {
  Avatar,
  Box,
  Container,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { useGetAllPublishedBlogs } from "@src/api";
import PersonIcon from "@mui/icons-material/Person";
import { makeBlogSlug } from "@src/helpers";
import Link from "next/link";

import React from "react";
import Image from "next/image";

const LandingPage = () => {
  const { data: blogs, isPending } = useGetAllPublishedBlogs();
  if (isPending)
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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

  return (
    <Box
      sx={{
        bgcolor: "#151515",
        minHeight: "100vh",
        p: 5,
        color: "#E5E7EB",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="bold" mb={6}>
          Published Blogs
        </Typography>

        <List sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {blogs?.map((blog: any) => (
            <ListItem
              key={blog.id}
              component={Paper}
              sx={{
                bgcolor: "#222222",
                borderRadius: 4,
                p: 3,
                flexDirection: "column",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.2s ease",
                "&:hover": {
                  boxShadow: "0 4px 6px rgba(0,0,0,0.15)",
                },
              }}
            >
              <Link
                href={`/blog-detail/${makeBlogSlug(blog.title, blog.id)}`}
                style={{ width: "100%", textDecoration: "none" }}
              >
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    {blog.user?.image ? (
                      <Avatar
                        src={blog.user.image}
                        alt={blog.user.name || "User"}
                        sx={{ width: 40, height: 40 }}
                      />
                    ) : (
                      <Avatar
                        sx={{ bgcolor: "grey.300", width: 40, height: 40 }}
                      >
                        <PersonIcon sx={{ color: "grey.700", fontSize: 20 }} />
                      </Avatar>
                    )}
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      color="#fff"
                    >
                      {blog.user?.name || "Anonymous"}
                    </Typography>
                  </Box>

                  <Typography variant="h5" fontWeight="600" color="grey.300">
                    {blog.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "grey.400",
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {blog.description}
                  </Typography>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    pt={2}
                    borderTop="1px solid"
                    borderColor="grey.800"
                  >
                    <Typography
                      variant="body2"
                      sx={{ textTransform: "capitalize", color: "grey.500" }}
                    >
                      {blog.status}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "grey.500" }}>
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default LandingPage;
