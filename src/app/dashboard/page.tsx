"use client";

import { Box, Typography } from "@mui/material";
import { useGetUserBlogs } from "@src/api";
import Image from "next/image";
import React from "react";

const Dashboard = () => {
  const { data: blogs, isPending } = useGetUserBlogs();

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

  const total = blogs?.length || 0;
  const published = blogs?.filter((b) => b.status === "published").length || 0;
  const drafts = blogs?.filter((b) => b.status === "draft").length || 0;

  return (
    <Box sx={{ py: 6 }}>
      <Box className="max-w-4xl mx-auto">
        <Typography variant="h4" fontWeight="bold" marginBottom={8}>
          Dashboard
        </Typography>
        <Box sx={{ display: "flex", gap: 4, mb: 4 }}>
          <Box
            sx={{
              bgcolor: "#222222",
              borderRadius: ".5rem",
              p: 2,
              flex: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="body1" color="#808080">
              Total Blogs
            </Typography>
            <Typography variant="body1" fontSize={25} fontWeight="bold">
              {total}
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "green",
              borderRadius: ".5rem",
              p: 2,
              flex: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="body1">Published</Typography>
            <Typography variant="body1" fontSize={25} fontWeight="bold">
              {published}
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "red",
              borderRadius: ".5rem",
              p: 2,
              flex: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="body1">Drafts</Typography>
            <Typography fontSize={25} fontWeight="bold">
              {drafts}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
