"use server";

import { Avatar, Box, Container, Divider, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { db } from "@src/db";
import { parseBlogSlug } from "@src/helpers";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const blogId = parseBlogSlug(slug);

  const blog = await db.blog.findUnique({
    where: { id: Number(blogId) },
    include: { user: true },
  });

  if (!blog) {
    notFound();
  }

  return (
    <Container sx={{ py: 5 }}>
      <Box
        sx={{
          borderRadius: 4,
          p: 4,
          bgcolor: "#222222",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          {blog.user?.image ? (
            <Avatar
              src={blog.user.image}
              alt={blog.user.name || "User"}
              sx={{ width: 40, height: 40, mr: 2 }}
            />
          ) : (
            <Avatar
              sx={{
                bgcolor: "grey.300",
                width: 40,
                height: 40,
                mr: 2,
              }}
            >
              <PersonIcon sx={{ color: "grey.700", fontSize: 20 }} />
            </Avatar>
          )}
          <Typography variant="subtitle2" color="white" fontWeight="500">
            {blog.user?.name || "Anonymous"}
          </Typography>
        </Box>

        <Typography
          variant="h4"
          fontWeight="bold"
          color="grey.300"
          gutterBottom
        >
          {blog.title}
        </Typography>

        <Typography
          variant="body1"
          color="grey.400"
          sx={{ mb: 3, lineHeight: 1.7 }}
        >
          {blog.description}
        </Typography>

        <Divider sx={{ borderColor: "grey.700", mb: 2 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "grey.500",
          }}
        >
          <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
            {blog.status}
          </Typography>
          <Typography variant="body2">
            Dated:{" "}
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Page;
