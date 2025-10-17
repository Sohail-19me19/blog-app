"use client";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Sidebar from "@src/layout/sidebar";
import { PublicPaths, SharedPaths } from "@src/config";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { Box } from "@mui/material";

export default function Layout({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: Session["user"];
}) {
  const pathname = usePathname();
  const { data } = useSession();

  const isPublic = PublicPaths.has(pathname);
  const isShared = SharedPaths.has(pathname);

  const isAuthenticated = !!(data?.user?.id || user?.id);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {!isPublic && <Navbar user={data?.user || user} />}
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {isAuthenticated && !isShared && <Sidebar />}
        <Box
          component="main"
          sx={{
            flex: 1,
            bgcolor: "#151515",
            overflow: "auto",
            mt: !isPublic ? 9 : 0,
            px: !isPublic ? { xs: 2, sm: 3, md: 5 } : 0,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
