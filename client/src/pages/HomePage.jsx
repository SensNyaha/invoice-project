import { Box, Button, Grid, Link, styled, Typography } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import '../styles/homepage.css';


const StyledTypography = styled(Typography)(({theme}) => (
    {
        fontSize: "12rem",
        [theme.breakpoints.down("sm")] : {
            fontSize: "9rem"
        }
    }
))

const CreateAccountButton = styled(Button)({
    backgroundColor: "#006888",
    borderColor:"#555 !important",
    borderRadius: "25px",
    border: "3px solid",
    "&:hover": {
        borderColor: "#fff !important",
        boxShadow: "none",
        backgroundColor:"#087fa4"
    }
})

function HomePage() {
    const navigate = useNavigate();
    return (
        <header className="masthead main-bg-image">
            <Grid>
                <Grid item md={12} lg={12} sm={6}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <StyledTypography 
                            variant="h1" 
                            align="center" 
                            sx={{textTransform: "uppercase"}}
                            className="homepage-header"
                        >
                            Чековая Книжка
                        </StyledTypography>
                        <Typography align="center" variant="h4" component="div" gutterBottom sx={{color: "rgba(255,255,255,0.6"}}>
                            Не важно каким бизнесом Вы занимаетесь.<br/>Работа с чеками станет гораздо проще!
                        </Typography>
                    </Box>
                    <Box sx={{display:"flex", justifyContent:"center", marginTop:"10px"}}>
                        <CreateAccountButton 
                            variant="contained" 
                            color="success" 
                            size="large" 
                            sx={{fontSize:"1.5em", borderRadius: '25px'}}
                            // onClick={() => navigate("/register")}
                        >
                            <Link 
                                component={RouterLink} 
                                to="/register" 
                                sx={{textDecoration:"none", color: "#fff", fontSize: "2rem"}}
                            >
                                Создать профиль
                            </Link>
                        </CreateAccountButton>
                    </Box>
                </Grid>
            </Grid>
        </header>
    )
}

export default HomePage