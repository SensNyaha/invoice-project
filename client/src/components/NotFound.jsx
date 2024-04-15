import {Box, Container, Typography} from "@mui/material";
import { FaHeartBroken, FaSadTear } from "react-icons/fa";

function NotFound() {
  return (
    <Container>
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap:"wrap",
            justifyContent:'center',
            height:"94vh"
        }}>
            <Typography variant="h1" align="center" sx={{fontSize:"10rem", mt: "14rem"}}>
                404 NOT FOUND
            </Typography>
            <Box>
                <FaHeartBroken className="broken-heart"/>
                <FaSadTear className="sad-tear"/>
            </Box>
        </Box>
    </Container>
  )
};

export default NotFound