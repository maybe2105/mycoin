import { Container } from "@mui/material";
import React from "react";

const PageLayout = ({ children }) => {
  return (
    <Container className="df aic jcc " sx={{ margin: "auto" }} maxWidth="sm">
      {children}
    </Container>
  );
};

export default PageLayout;
