import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useWallet } from "../context/WalletContext";
import PageLayout from "../layout/PageLayout";
import { ethers } from "ethers";
import "../styles/import.scss";
import { useNavigate } from "react-router-dom";

const ImportPage = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [error, setError] = useState("");

  //   const wallet = React.memo(() => {
  //     return ethers.Wallet.fromMnemonic(mnemonic);
  //   }, [mnemonic]);

  const navigate = useNavigate();
  const goToHome = useCallback(
    () => navigate("/home", { replace: true }),
    [navigate]
  );

  const { setWallet } = useWallet();
  return (
    <PageLayout>
      <Paper
        sx={{
          padding: 4,
        }}
      >
        <Typography variant="h6" textAlign="center" className="sb">
          Import Wallet
        </Typography>
        <Typography textAlign="center">Enter your phrase to import</Typography>
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          margin="dense"
          label="Mnemonic Phrases"
          multiline
          value={mnemonic}
          onChange={(e) => {
            if (error) setError("");
            setMnemonic(e.target.value);
          }}
          rows={3}
          error={error}
        ></TextField>
        <Typography color="error">{error}</Typography>
        <Button
          sx={{ mt: 2 }}
          className="btn-hover color-3"
          fullWidth
          onClick={() => {
            if (!mnemonic) {
              setError("Please enter your phrase");
              return;
            } else {
              try {
                const wallet = ethers.Wallet.fromMnemonic(mnemonic);

                setWallet(wallet);
                goToHome();
              } catch (e) {
                setError("Invalid phrase");
              }
            }
          }}
        >
          Import
        </Button>
      </Paper>
    </PageLayout>
  );
};

export default ImportPage;
