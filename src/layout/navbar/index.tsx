import React from "react";
import { NavLogo, ProfileDrawer } from "./elements";
import NextLink from "next/link";
import { Session } from "next-auth";
import { AppBar, Box, Button, Toolbar } from "@mui/material";

const Navbar = ({ user }: { user?: Session["user"] }) => {
  return (
    <AppBar
      sx={{
        backgroundColor: "black",
        zIndex: "1202",
        boxShadow: "1px 1px 1px rgba(0,0,0,0.2)",
        height: 73,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,
          py: 1,
        }}
      >
        <NavLogo />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {!!user ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                minWidth: "80vw",
              }}
            >
              <Button
                component={NextLink}
                href="/dashboard"
                disableRipple
                sx={{
                  color: "#f5f5f5",
                  borderRadius: "9999px",
                  p: 1.5,
                  mr: 2,
                  "&:hover": {
                    textDecoration: "underline",
                    bgcolor: "transparent",
                  },
                }}
              >
                Dashboard
              </Button>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  component={NextLink}
                  href="/create-blog"
                  variant="outlined"
                  color="inherit"
                  sx={{
                    borderRadius: "9999px",
                    p: 1.5,
                    mr: 2,
                    boxSizing: "border-box",
                  }}
                >
                  + create Blogs
                </Button>

                <ProfileDrawer user={user} />
              </Box>
            </Box>
          ) : (
            <Button
              component={NextLink}
              href="/sign-in"
              variant="outlined"
              color="inherit"
              sx={{
                borderRadius: "9999px",
                px: 4,
                py: 1.5,
                mr: 2,
              }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
