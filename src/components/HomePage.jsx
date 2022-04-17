import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../context/WalletContext";
import PageLayout from "../layout/PageLayout";
import "../styles/home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { ethers } from "ethers";

const HomePage = () => {
  const { wallet, balance, setWallet } = useWallet();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!wallet) {
      const _wallet = JSON.parse(localStorage.getItem("wallet"));

      if (wallet) {
        const __wallet = ethers.Wallet.fromMnemonic(_wallet.phrase);

        setWallet(__wallet);
      } else navigate(`/`, { replace: true });
    }
  }, [wallet]);

  return (
    <PageLayout>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h6" textAlign="center" className="sb">
          MyCoin Wallet
        </Typography>

        <Typography textAlign="center">{wallet?.address}</Typography>
        <Typography className="sb" mt={1} sx={{ fontSize: 18 }}>
          Balance:{" "}
          <Typography component="span" sx={{ fontSize: 18 }}>
            {" "}
            {balance} ETH
          </Typography>
        </Typography>
        <Button
          fullWidth={true}
          className="btn-hover color-9"
          sx={{
            mt: 2,
          }}
          component={Link}
          to="/send"
        >
          Send ETH
        </Button>
        <Box className="df" mt={3}>
          <Button
            fullWidth
            className="btn-hover color-11"
            onClick={() => {
              navigate("/history");
            }}
          >
            History
          </Button>
          <Box width={24} />
          <Button
            fullWidth
            className="btn-hover color-8"
            onClick={() => {
              localStorage.removeItem("wallet");
              setWallet(null);
            }}
          >
            Log Out
          </Button>
        </Box>
      </Paper>
    </PageLayout>
  );
};

export default HomePage;
