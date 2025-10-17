"use client";

import { useState } from "react";
import {
  Drawer,
  Avatar,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { signOutAction } from "@src/libs";
import { Session } from "next-auth";
import NextLink from "next/link";
import { useSession } from "next-auth/react";

export default function ProfileDrawer({ user }: { user: Session["user"] }) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{ "&:hover": { bgcolor: "transparent" } }}
      >
        {user?.image ? (
          <Avatar
            src={session?.user.image || user.image}
            alt={session?.user.name || "User"}
            sx={{ width: 40, height: 40 }}
          />
        ) : (
          <Avatar sx={{ width: 40, height: 40 }}>
            <AccountCircleIcon />
          </Avatar>
        )}
      </IconButton>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 280,
            p: 3,
            mt: 9,
            bgcolor: "#111827",
            height: "100vh",
            backgroundColor: "#151515",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            {user?.image ? (
              <Avatar
                src={session?.user.image || user.image}
                alt={user.name || "User"}
                sx={{ width: 64, height: 64, mb: 1 }}
              />
            ) : (
              <Avatar sx={{ width: 64, height: 64, mb: 1 }}>
                <AccountCircleIcon fontSize="large" />
              </Avatar>
            )}
            <Typography variant="h6">{user?.name}</Typography>
            <Typography
              sx={{ color: "#606060" }}
              variant="body2"
              color="text.secondary"
            >
              {user?.email}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <List>
            <ListItemButton
              component={NextLink}
              href="/profile-settings"
              sx={{
                borderRadius: "0.3rem",
                mb: 1,
                bgcolor: "#222222",
                display: "flex",
                alignItems: "center",
                p: 1,
                color: "#606060",
                "& .MuiSvgIcon-root": { color: "#606060" },
                "&:hover": { bgcolor: "#252525", color: "#fff" },
                "&:hover .MuiSvgIcon-root": { color: "#fff" },
              }}
            >
              <ListItemIcon sx={{ ml: 1 }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" />
            </ListItemButton>

            <ListItemButton
              sx={{
                borderRadius: "0.3rem",
                marginBottom: "1px",
                backgroundColor: "#222222",
                color: "#606060",
                "& .MuiSvgIcon-root": { color: "#606060" },
                "&:hover .MuiSvgIcon-root": { color: "#fff " },
                "&:hover": { backgroundColor: "error.dark", color: "#fff" },
              }}
              onClick={async () => {
                await signOutAction();
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
