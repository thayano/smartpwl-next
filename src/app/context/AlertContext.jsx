'use client'
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";


export const AlertContext = ({ status, type, message }) => {
  return (
    <Collapse in={status || false}>
      <Alert
        severity={type || 'error'}
        sx={{ mb: 2 }}
      >
        {message}
      </Alert>
    </Collapse>
  );
};
