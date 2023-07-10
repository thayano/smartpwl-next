"use client";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

import CloseIcon from "@mui/icons-material/Close";

export default function AlertContext({ status, type , message }) {
  useEffect(() => {
    setStatusContext(status);
  }, [status]);

  const [statusContext, setStatusContext] = useState(false);
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Collapse in={statusContext}>
        <Alert
          severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setStatusContext(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Stack>
  );
}
