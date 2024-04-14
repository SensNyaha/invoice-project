import { Box } from "@mui/material"
import {FcGoogle} from "react-icons/fc";

function GoogleLogin() {
    const googleOpen = () => {
        //TODO: изменить здесь для продакшена
        window.open("http://localhost:8080/api/v1/auth/google", "_self");
    }
  return (
    <Box sx={{cursor:"pointer"}} onClick={googleOpen}>
        <FcGoogle className="google-icon"/>
    </Box>
  )
}

export default GoogleLogin