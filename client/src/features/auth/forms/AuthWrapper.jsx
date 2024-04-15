import { Box } from "@mui/material";

function AuthWrapper({ children }) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "115vh",
            }}
        >
            {children}
        </Box>
    );
}

export default AuthWrapper;
