import {
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import PageLayout from "../layout/PageLayout";
import { ethers } from "ethers";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
const _STEP = {
  phrase: { step: 0, label: "Save your phrase" },
  confirm: { step: 1, label: "Confirm your phrase" },
  done: { step: 2, label: "Complete" },
};

const CreatePage = () => {
  const wallet = useMemo(() => {
    const eth = ethers.Wallet.createRandom();
    return {
      address: eth.address,
      phrase: eth.mnemonic.phrase,
      privateKey: eth.privateKey,
    };
  }, []);

  const [step, setStep] = useState(_STEP.phrase.step);
  const [phrase, setPhrase] = useState("");
  const [error, setError] = useState("");

  React.useEffect(() => {
    setError("");
    if (step == _STEP.phrase.step) {
      setPhrase("");
    }
  }, [step]);

  return (
    <PageLayout>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h6" className="sb" textAlign="center">
          Mnemonic Phrase
        </Typography>
        <Stepper activeStep={step} alternativeLabel sx={{ mt: 1 }}>
          {Object.values(_STEP).map((item) => (
            <Step key={item.step}>
              <StepLabel>{item.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {step == _STEP.phrase.step ? (
          <Typography
            sx={{
              borderRadius: 2,
              padding: 2,
              mt: 2,
              border: "1px solid #ccc",
            }}
          >
            {wallet.phrase}
          </Typography>
        ) : step == _STEP.confirm.step ? (
          <Box className="df fdc" mt={2}>
            <Typography textAlign="center">
              Please enter your phrase to complete the step
            </Typography>
            <TextField
              variant="outlined"
              margin="dense"
              mt={1}
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              multiline
              rows={3}
              error={error}
            />
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          </Box>
        ) : (
          <Box className="df fdc" mt={2}>
            <Typography className="sb" textAlign="center">
              Create wallet completed!
            </Typography>
            <Typography textAlign="center">Your Wallet Address</Typography>
            <Typography textAlign="center">{wallet.address}</Typography>
            <Typography textAlign="center">
              You can acccess your wallet now through your phrase
            </Typography>
          </Box>
        )}
        <Box className="df" mt={3}>
          <Button
            onClick={() => {
              if (step > _STEP.phrase.step) {
                setStep(step - 1);
              }
            }}
            fullWidth
            variant="outlined"
            {...(step > _STEP.confirm.step
              ? {
                  component: Link,
                  to: "/",
                }
              : {})}
          >
            {step == _STEP.phrase.step
              ? "Cancel"
              : step == _STEP.confirm.step
              ? "Back"
              : "Exit"}
          </Button>
          <Box width={24} />
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              if (step <= _STEP.confirm.step) {
                if (step == _STEP.confirm.step) {
                  if (phrase.trimStart().trim() == wallet.phrase) {
                    let wallets =
                      JSON.parse(localStorage.getItem("wallets")) || {};
                    wallets[wallet.phrase] = JSON.stringify(wallet);
                    localStorage.setItem("wallets", JSON.stringify(wallets));

                    setStep(step + 1);
                  } else {
                    setError("Phrase doesnt exist");
                  }
                } else {
                  setStep(step + 1);
                }
              } else {
                console.log("done");
              }
            }}
            {...(step > _STEP.confirm.step
              ? {
                  component: Link,
                  to: "/import",
                }
              : {})}
          >
            {step == _STEP.phrase.step
              ? "Next"
              : step == _STEP.confirm.step
              ? "Verify"
              : "Access"}
          </Button>
        </Box>
      </Paper>
    </PageLayout>
  );
};

export default CreatePage;
