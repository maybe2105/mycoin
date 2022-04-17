import { Button, Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "../styles/login.scss";
import { Link } from "react-router-dom";
import PageLayout from "../layout/PageLayout";

const LoginPage = () => {
  return (
    <PageLayout>
      <Paper sx={{ padding: 4 }} className="df fdc">
        <Typography variant="h6" className="sb" textAlign="center">
          MyCoin Wallet
        </Typography>
        <Button
          variant="outlined"
          className="btn-hover color-1"
          sx={{ mt: 1 }}
          component={Link}
          to="/create"
        >
          Create Wallet
        </Button>
        <Typography clasName="sb" sx={{ mt: 1 }} textAlign="center">
          or
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 1 }}
          className="btn-hover color-6"
          component={Link}
          to="/import"
        >
          Import Wallet
        </Button>
      </Paper>
    </PageLayout>
  );
};

export default LoginPage;
