import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { strengthColor } from "../../../utils/passwordStrengthChecker.js";
import { useRegisterUserMutation } from "../authApiSlice.js";

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

const USERNAME_REGEXP = /^[A-za-z][A-Za-z0-9./@-]*$/;

function RegisterForm() {
    useTitle("Чековая книжка - Регистрация");

    const navigate = useNavigate();

    const [showPw, setShowPw] = useState(false);
    const [showCPw, setShowCPw] = useState(false);
    const handleShowHidePw = () => {
        setShowPw((prev) => !prev);
    };
    const handleShowHideCPw = () => {
        setShowCPw((prev) => !prev);
    };

    const handleMouseDownPassword = (e) => e.preventDefault;

    const [level, setLevel] = useState();
    const changePassword = (value) => setLevel(strengthColor(value));
    useEffect(() => {
        changePassword("");
    }, []);

    const [registerUser, { data, isLoading, isSuccess }] =
        useRegisterUserMutation();
    useEffect(() => {
        if (isSuccess) {
            navigate("/");

            const message = data?.message;
            toast.success(message);
        }
    }, [data, isSuccess, navigate]);

    return (
        <>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    username: "",
                    password: "",
                    passwordConfirm: "",
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email("Необходим валидный адрес эл.почты")
                        .required("Эл.почта обязательна для заполнения"),
                    firstName: Yup.string()
                        .max(255)
                        .required("Имя обязательно для заполнения"),
                    lastName: Yup.string()
                        .max(255)
                        .required("Фамилия обязательна для заполнения"),
                    username: Yup.string()
                        .matches(
                            USERNAME_REGEXP,
                            "Логин должен начинаться с буквы и может включать только буквы, цифры, точку, слеш и собаку"
                        )
                        .required("Логин обязателен для заполнения"),
                    password: Yup.string()
                        .max(255)
                        .required("Пароль обязателен для заполнения"),
                    passwordConfirm: Yup.string()
                        .oneOf([Yup.ref("password")], "Пароли должны совпадать")
                        .required("Обязательно подтвердить поле с паролем"),
                })}
                onSubmit={async (values, { setStatus, setSubmitting }) => {
                    try {
                        await registerUser(values).unwrap();
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
                        {isLoading && <Spinner />}
                        {!isLoading && (
                            <Grid spacing={3}>
                                {/* firstName */}
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="firstName-signup">
                                            Ваше имя:
                                        </InputLabel>
                                        <OutlinedInput
                                            id="firstName-signup"
                                            type="firstName"
                                            value={values.firstName}
                                            name="firstName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Имя"
                                            fullWidth
                                            error={Boolean(
                                                touched.firstName &&
                                                    errors.firstName
                                            )}
                                        />
                                        {touched.firstName &&
                                            errors.firstName && (
                                                <FormHelperText
                                                    error
                                                    id="helper-text-firstName-signup"
                                                >
                                                    {errors.firstName}
                                                </FormHelperText>
                                            )}
                                    </Stack>
                                </Grid>
                                {/* lastName */}
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="lastName-signup">
                                            Ваша фамилия:
                                        </InputLabel>
                                        <OutlinedInput
                                            id="lastName-signup"
                                            type="lastName"
                                            value={values.lastName}
                                            name="lastName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Фамилия"
                                            fullWidth
                                            error={Boolean(
                                                touched.lastName &&
                                                    errors.lastName
                                            )}
                                        />
                                        {touched.lastName &&
                                            errors.lastName && (
                                                <FormHelperText
                                                    error
                                                    id="helper-text-lastName-signup"
                                                >
                                                    {errors.lastName}
                                                </FormHelperText>
                                            )}
                                    </Stack>
                                </Grid>
                                {/* username */}
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="username-signup">
                                            Логин:
                                        </InputLabel>
                                        <OutlinedInput
                                            id="username-signup"
                                            value={values.username}
                                            name="username"
                                            inputProps={{}}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Логин"
                                            fullWidth
                                            error={Boolean(
                                                touched.username &&
                                                    errors.username
                                            )}
                                        />
                                        {touched.username &&
                                            errors.username && (
                                                <FormHelperText
                                                    error
                                                    id="helper-text-username-signup"
                                                >
                                                    {errors.username}
                                                </FormHelperText>
                                            )}
                                    </Stack>
                                </Grid>
                                {/* Email */}
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-signup">
                                            Ваша эл.почта:
                                        </InputLabel>
                                        <OutlinedInput
                                            id="email-signup"
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
                                                id="helper-text-email-signup"
                                            >
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                {/* Password */}
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="password-signup">
                                            Пароль
                                        </InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(
                                                touched.password &&
                                                    errors.password
                                            )}
                                            id="password-signup"
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
                                                    id="helper-text-password-signup"
                                                >
                                                    {errors.password}
                                                </FormHelperText>
                                            )}
                                    </Stack>
                                    {/* password string indicator */}
                                    <FormControl fullWidth sx={{ mt: 2 }}>
                                        <Grid
                                            container
                                            spacing={2}
                                            alignItems={"center"}
                                        >
                                            <Grid item>
                                                <Box
                                                    sx={{
                                                        backgroundColor:
                                                            level?.color,
                                                        width: 350,
                                                        height: 8,
                                                        borderRadius: "7px",
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    variant="subtitle1"
                                                    fontSize="0.75rem"
                                                >
                                                    {level?.label}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </FormControl>
                                </Grid>
                                {/* Password Confirm*/}
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="password-confirm-signup">
                                            Подтверждение пароля
                                        </InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(
                                                touched.passwordConfirm &&
                                                    errors.passwordConfirm
                                            )}
                                            id="password-confirm-signup"
                                            type={showCPw ? "text" : "password"}
                                            value={values.passwordConfirm}
                                            name="passwordConfirm"
                                            onBlur={handleBlur}
                                            onChange={(e) => handleChange(e)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password confirm visibility"
                                                        onClick={
                                                            handleShowHideCPw
                                                        }
                                                        onMouseDown={
                                                            handleShowHideCPw
                                                        }
                                                        edge="end"
                                                        size="medium"
                                                    >
                                                        {showCPw ? (
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
                                        {touched.passwordConfirm &&
                                            errors.passwordConfirm && (
                                                <FormHelperText
                                                    error
                                                    id="helper-text-password-confirm-signup"
                                                >
                                                    {errors.passwordConfirm}
                                                </FormHelperText>
                                            )}
                                    </Stack>
                                </Grid>
                                {/* terms of service */}
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        Регистрацией вы подтверждаете согласие с
                                        нашими{" "}
                                        <Link
                                            variant="subtitle2"
                                            component={RouterLink}
                                            to="#"
                                        >
                                            правилами пользования сервисом
                                        </Link>{" "}
                                        и{" "}
                                        <Link
                                            variant="subtitle2"
                                            component={RouterLink}
                                            to="#"
                                        >
                                            соглашением о обработке данных
                                        </Link>
                                    </Typography>
                                </Grid>
                                {errors.submit && (
                                    <Grid item xs={12}>
                                        <FormHelperText error>
                                            {errors.submit}
                                        </FormHelperText>
                                    </Grid>
                                )}
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
                                            Создать учётную запись
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

export default RegisterForm;
