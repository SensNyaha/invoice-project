import { useEffect, useState } from "react"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import Yup from "yup"
import {strengthColor} from '../../../utils/passwordStrengthChecker.js'
import {useRegisterUserMutation} from '../authApiSlice.js'

import {Box, Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Stack, Typography} from "@mui/material"

import {Formik} from 'formik';
import AuthButtonAnimation from "../../../animations/authButtonAnimation.js"
// import Spinner from '../../../animations/'
import useTitle from "../../../hooks/useTitle.jsx"

const USERNAME_REGEXP = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!#@$%^&*()+=._-]).{6,}$/;

function RegisterForm() {
  return (
    <div>RegisterForm</div>
  )
}

export default RegisterForm
