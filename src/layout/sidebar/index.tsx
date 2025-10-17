"use client";

import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/blogs", label: "Blogs" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          bgcolor: "#151515",
          borderRight: "none",
          boxShadow: "1px 1px 1px rgba(0,0,0,0.2)",
          zIndex: "1201",
        },
      }}
    >
      <List sx={{ px: 1, mt: 9 }}>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <ListItemButton
              key={link.href}
              component={Link}
              href={link.href}
              selected={isActive}
              sx={{
                borderRadius: "8px",
                mb: 0.5,
                color: "#606060",
                "&.Mui-selected": {
                  bgcolor: "#222222",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#252525",
                  },
                },
                "&:hover": {
                  bgcolor: "#222222",
                  color: "#fff",
                },
              }}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
