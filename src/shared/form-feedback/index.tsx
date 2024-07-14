import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import { Alert } from "@mui/material";

export const FormFeedback: React.FC<{
  message?: string;
}> = ({ message }) => {
  if (!message) return null;

  return <Alert severity={"error"}>{message}</Alert>;
};
