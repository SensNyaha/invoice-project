import {Box, CssBaseline, Link, Typography} from "@mui/material";
import { FaMoneyBillWave } from "react-icons/fa";

function Copyright() {
    return (
        <Typography variant="body2" align="center" sx={{color: "#FFF"}}>
            {"Copyright ©"}
            <Link color="inherit" href="https://github.com/sensnyaha">Разработчик</Link>
            {new Date().getFullYear}
        </Typography>
    )
}

function Footer() {
  return (
    <Box sx={{
        position: "fixed",
        bottom: 0,
        width: "100%"
    }}>
        <CssBaseline/>
        <Box component="footer" sx={{
            py: 1,
            px: 1,
            mt: "auto",
            bgColor: "#000"
        }}>
            <Typography variant="subtitle1" align="center" component="p" sx={{
                color: "#07f011"
            }}>
                <FaMoneyBillWave/>
                {"\t"}Потому что деньги нужны также как воздух{"\t"}
                <FaMoneyBillWave/>
            </Typography>
            <Copyright/>
        </Box>
    </Box>
  )
}

export default Footer