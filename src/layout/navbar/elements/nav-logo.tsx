import { Box, Typography } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";

const NavLogo = () => {
  return (
    <Box
      component={NextLink}
      href="/"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <Image
        src="/images/icon.png"
        alt="logo"
        width={40}
        height={40}
        style={{
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "1px 1px 8px black",
        }}
      />

      <Typography
        variant="h5"
        noWrap
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          textShadow: "1px 1px  black",
        }}
      >
        BlogApp
      </Typography>
    </Box>
  );
};

export default NavLogo;
