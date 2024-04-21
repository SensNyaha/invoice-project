import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import { iseDispatch, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    OutlinedInput,
    Stack,
    Typography,
} from "@mui/material";

import { Formik } from "formik";
import AuthButtonAnimation from "../../../animations/authButtonAnimation.js";
import Spinner from "../../../components/Spinner.jsx";
import useTitle from "../../../hooks/useTitle.jsx";
import { useLoginUserMutation } from "../authApiSlice.js";
import { logIn } from "../authSlice.js";

function LoginForm() {
    useTitle("Чековая книжка - Вход");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/dashboard";

    const [showPw, setShowPw] = useState(false);
    const handleShowHidePw = () => {
        setShowPw((prev) => !prev);
    };

    const handleMouseDownPassword = (e) => e.preventDefault;

    const [loginUser, { data, isLoading, isSuccess }] = useLoginUserMutation();
    useEffect(() => {
        if (isSuccess) {
            navigate(from, { replace: true });
        }
    }, [data, isSuccess, navigate, from]);
    return (
        <>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email("Необходим валидный адрес эл.почты")
                        .required("Эл.почта обязательна для заполнения"),
                    password: Yup.string()
                        .max(255)
                        .required("Пароль обязателен для заполнения"),
                })}
                onSubmit={async (values, { setStatus, setSubmitting }) => {
                    try {
                        const userCredits = await loginUser(values).unwrap();
                        dispatch(logIn({ ...userCredits }));
                        setStatus({ success: true });
                        setSubmitting(false);
                    } catch (e) {
                        const message = e.data.message;
                        toast.error(message);
                        setStatus({ success: false });
                        setSubmitting(false);
                    }
                }}
            >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                }) => (
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <Grid container spacing={3}>
                                {/* Email */}
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-signin">
                                            Ваша эл.почта:
                                        </InputLabel>
                                        <OutlinedInput
                                            id="email-signin"
                                            value={values.email}
                                            type="email"
                                            name="email"
                                            inputProps={{}}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Эл.почта"
                                            fullWidth
                                            error={Boolean(
                                                touched.email && errors.email
                                            )}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText
                                                error
                                                id="helper-text-email-signin"
                                            >
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="password-signin">
                                            Пароль
                                        </InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(
                                                touched.password &&
                                                    errors.password
                                            )}
                                            id="password-signin"
                                            type={showPw ? "text" : "password"}
                                            value={values.password}
                                            name="password"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                handleChange(e);
                                                changePassword(e.target.value);
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleShowHidePw
                                                        }
                                                        onMouseDown={
                                                            handleShowHidePw
                                                        }
                                                        edge="end"
                                                        size="medium"
                                                    >
                                                        {showPw ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            placeholder="******"
                                            inputProps={{}}
                                        />
                                        {touched.password &&
                                            errors.password && (
                                                <FormHelperText
                                                    error
                                                    id="helper-text-password-signin"
                                                >
                                                    {errors.password}
                                                </FormHelperText>
                                            )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Link
                                            variant="h6"
                                            component={RouterLink}
                                            to="/reset_password_request"
                                            sx={{ textDecoration: "none" }}
                                        >
                                            Забыли пароль?
                                        </Link>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <AuthButtonAnimation>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            sx={{ mt: "20px" }}
                                        >
                                            Войти
                                        </Button>
                                    </AuthButtonAnimation>
                                </Grid>
                            </Grid>
                        )}
                    </form>
                )}
            </Formik>
        </>
    );
}

export default LoginForm;
