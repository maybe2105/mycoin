import { Button, Container, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../context/WalletContext";
import { ethers } from "ethers";

const HistoryPage = () => {
  const { history, wallet } = useWallet();
  console.log(
    "🚀 ~ file: HistoryPage.jsx ~ line 10 ~ HistoryPage ~ wallet",
    wallet
  );

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!wallet) {
      navigate("/");
    }
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{
        border: "3px solid #e8e8e8",
        p: 4,
        minHeight: "100vh",
        overflow: "auto",
      }}
      className="df fdc"
      fullWidth={true}
    >
      <Box className="df aic jcc">
        <Typography className="sb tc" variant="h6">
          Transaction History
        </Typography>
      </Box>
      {history.length > 0 ? (
        <Box className="df fdc" mt={2}>
          {history.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  border: `1px solid blue`,
                  mb: 2,
                  p: 2,
                  borderRadius: 4,
                }}
              >
                <Typography>Hash: {item.hash}</Typography>
                <Typography>
                  Gas: {ethers.utils.formatEther(item.gasPrice)} ETH
                </Typography>
                <Typography>
                  From: {item.from} {wallet.address == item.from ? "(You)" : ""}
                </Typography>
                <Typography>
                  To {item.to} {wallet.address == item.to ? "You" : ""}
                </Typography>
                {item.value && (
                  <Typography>
                    Value: {ethers.utils.formatEther(item.value)} ETH
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      ) : (
        <Typography className="tc">
          You havent made any transaction yet
        </Typography>
      )}
      <Box className="df aic jcc">
        <Button
          color="primary"
          variant="contained"
          sx={{ width: 200 }}
          onClick={() => {
            navigate("/home");
          }}
        >
          Back
        </Button>
      </Box>
    </Container>
  );
};

export default HistoryPage;
