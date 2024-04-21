import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Button, Stack, Typography, Grid } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import useTitle from "../../../hooks/useTitle.jsx";

function VerificationPage() {
    useTitle("Чековая книжка - Подтверждение пользователя");
    return (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            height="94vh"
        >
            <FaCheckCircle className="verified" />
            <Typography variant="h2" gutterBottom>
                Подтверждение учетной записи
            </Typography>

            <Typography variant="h5" component="div" gutterBottom>
                Ваша учетная запись была успешно подтверждена. Ваш ЛК готов к
                работе
            </Typography>

            <Typography variant="h5" component="div" gutterBottom>
                Подтверждение об этом было отправлено на Вашу почту
            </Typography>
            <Button startIcon={<LockOpenIcon />} endIcon={<LockOpenIcon />}>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/login"
                    sx={{ textDecoration: "none" }}
                >
                    Войдите в сервис
                </Typography>
            </Button>
        </Stack>
    );
}

export default VerificationPage;
