import { Box } from "@mui/material";
import '../styles/spinner.css';

function Spinner() {
  return (
    <Box className="spinnerContainer">
        <Box className="spinner"></Box>
    </Box>
  )
}

export default Spinner