import {
  Alert,
  Button,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../context/WalletContext";
import PageLayout from "../layout/PageLayout";
import "../styles/home.scss";

const SendPage = () => {
  const { wallet, sendEth, loadBalance } = useWallet();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!wallet) {
      navigate("/home");
    }
  }, [wallet]);

  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("0");
  const [error, setError] = useState("");
  const [txObject, setTxObject] = useState({});

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (error) {
      setError("");
    }
  }, [amount, address]);

  return (
    <PageLayout>
      {step == 0 ? (
        <Paper sx={{ padding: 4 }}>
          <Typography variant="h6" className="sb tc">
            Send ETH
          </Typography>

          <Typography className="tc" sx={{ mb: 3 }}>
            {wallet?.address}
          </Typography>
          <Box className="df aic">
            <Typography alignSelf="center" sx={{ minWidth: 75 }}>
              To:{" "}
            </Typography>
            <TextField
              margin="dense"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth={true}
            />
          </Box>
          <Box className="df aic">
            <Typography sx={{ minWidth: 75 }} alignSelf="center">
              Amount:{" "}
            </Typography>
            <TextField
              margin="dense"
              fullWidth={true}
              value={amount}
              inputProps={{
                step: "0.01",
              }}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
            />
          </Box>
          {loading && (
            <Typography sx={{ color: "#187bcd", mt: 1, mb: 1 }}>
              Transaction is being proceeded...
            </Typography>
          )}
          <Box className="df aic">
            <Button
              fullWidth={true}
              sx={{
                mt: 2,
              }}
              className="btn-hover color-8"
              onClick={() => {
                navigate("/home");
              }}
            >
              Back
            </Button>
            <Box width={24} />
            <Button
              fullWidth={true}
              className="btn-hover color-10"
              disabled={loading}
              sx={{
                mt: 2,
              }}
              onClick={async () => {
                if (!amount || amount == "0") {
                  return setError("Please enter an amount");
                }

                if (!address) {
                  return setError("Please enter an address");
                }
                try {
                  setLoading(true);
                  const result = await sendEth(address, amount);
                  console.log(
                    "🚀 ~ file: SendPage.jsx ~ line 95 ~ onClick={ ~ result",
                    result
                  );
                  setLoading(false);
                  if (result.hash) {
                    setTxObject(result);
                    setStep(1);
                    loadBalance();
                  } else {
                    console.log(result);
                  }
                } catch (error) {
                  setLoading(false);
                  if (error.argument == "address") {
                    setError("Invalid Address");
                  } else {
                    setError(
                      "insufficient funds for intrinsic transaction cost"
                    );
                  }
                }
              }}
            >
              Send
            </Button>
          </Box>
        </Paper>
      ) : (
        <Paper sx={{ padding: 4 }}>
          <Typography
            variant="h6"
            className="sb tc"
            sx={{
              color: "#5cb85c",
            }}
          >
            Your Transaction Is Completed!
          </Typography>
          <Typography className="sb" sx={{ mt: 1 }}>
            {amount} ETH has been sent to {address}
          </Typography>
          <Typography>Hash: {txObject.hash}</Typography>
          <Typography>Gas: {txObject.gasPrice || 0}</Typography>

          <Button
            fullWidth={true}
            className="btn-hover color-9"
            sx={{ mt: 1 }}
            onClick={() => {
              navigate("/home");
            }}
          >
            Back to Home
          </Button>
        </Paper>
      )}
      <Snackbar
        open={!!error}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={() => {
          setError("");
        }}
      >
        <Alert
          onClose={() => {
            setError("");
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </PageLayout>
  );
};

export default SendPage;
