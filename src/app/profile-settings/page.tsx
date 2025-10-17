"use client";

import React, { useState } from "react";
import { ChangeImage, ChangeInfo, ChangePassword } from "./(components)";
import { Box, Paper, Tabs, Tab, Container } from "@mui/material";

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState<"image" | "info" | "password">(
    "image"
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue as "image" | "info" | "password");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          p: 3,
          bgcolor: "#1e1e1e",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            centered
            TabIndicatorProps={{
              style: {
                backgroundColor: "#fff",
              },
            }}
            sx={{
              "& .MuiTab-root": {
                color: "#606060",
                fontWeight: "500",
              },
              "& .Mui-selected": {
                color: "#fff !important",
              },
            }}
          >
            <Tab label="Change Image" value="image" />
            <Tab label="Change Info" value="info" />
            <Tab label="Change Password" value="password" />
          </Tabs>
        </Box>

        <Box>
          {activeTab === "image" && <ChangeImage />}
          {activeTab === "info" && <ChangeInfo />}
          {activeTab === "password" && <ChangePassword />}
        </Box>
      </Paper>
    </Container>
  );
};

export default EditProfile;
