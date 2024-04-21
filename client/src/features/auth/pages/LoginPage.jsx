import {
    Box,
    Button,
    Container,
    Grid,
    Link,
    Typography,
    Divider,
} from "@mui/material";
import { FaSignInAlt } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import GoogleLogin from "../../../components/GoogleLogin.jsx";
import StyledDivider from "../../../components/StyledDivider.jsx";
import AuthWrapper from "../forms/AuthWrapper.jsx";
import LoginForm from "../forms/LoginForm.jsx";

function LoginPage() {
    return (
        <AuthWrapper>
            <Container
                component="main"
                maxWidth="sm"
                sx={{
                    border: "2px solid #e4e5e7",
                    borderRadius: "25px",
                    py: 2,
                }}
            >
                <Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <FaSignInAlt className="auth-svg" /> &nbsp;
                            <Typography variant="h1" sx={{ fontSize: "44px" }}>
                                Вход
                            </Typography>
                        </Box>
                        <StyledDivider />
                    </Grid>
                    <LoginForm />
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                alignItems: "center",
                                display: "flex",
                                mt: "40px",
                            }}
                        >
                            <Divider
                                sx={{ flexGrow: 1 }}
                                orientation="horizontal"
                            />
                            <Button
                                variant="outlined"
                                sx={{
                                    cursor: "unset",
                                    m: 1,
                                    py: 0.5,
                                    px: 7,
                                    borderColor: "grey !important",
                                    color: "grey !important",
                                    fontWeight: 500,
                                    borderRadius: "25px",
                                }}
                                disableRipple
                                disabled
                            >
                                или войдите через GOOGLE
                            </Button>
                            <Divider
                                sx={{ flexGrow: 1 }}
                                orientation="horizontal"
                            ></Divider>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <GoogleLogin />
                        </Box>
                    </Grid>
                    <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                borderRadius: "25px",
                                "&:hover": {
                                    bgcolor: "#CCFF996b",
                                },
                                mt: 2,
                                mb: 2,
                            }}
                        >
                            <Button>
                                <Typography
                                    component={Link}
                                    to="/register"
                                    variant="h6"
                                    sx={{
                                        textDecoration: "none",
                                    }}
                                    color="primary"
                                >
                                    Еще нет аккаунта?
                                </Typography>
                            </Button>
                        </Box>
                    </Grid>
                    <Divider
                        sx={{ flexGrow: 1, mb: 1, mt: 1 }}
                        orientation="horizontal"
                    />
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                borderRadius: "25px",
                                "&:hover": {
                                    bgcolor: "#CCFF996b",
                                },
                                mt: 2,
                                mb: 2,
                            }}
                        >
                            <Button>
                                <Typography
                                    component={Link}
                                    to="/resend"
                                    variant="h6"
                                    sx={{
                                        textDecoration: "none",
                                    }}
                                    color="primary"
                                >
                                    Не получили письмо с подтверждением или не
                                    успели подтвердить учетную запись?
                                </Typography>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </AuthWrapper>
    );
}

export default LoginPage;
