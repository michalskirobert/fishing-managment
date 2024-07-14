import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingIcon = () => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        height: "100%",
        zIndex: 1,
        background: "white",
        opacity: 0.6,
        cursor: "wait",
      }}
    >
      <Typography variant="h6">Wczytywanie</Typography>
      <CircularProgress />
    </Box>
  );
};

export default LoadingIcon;
