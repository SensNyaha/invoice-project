import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Footer from "./components/Footer.jsx";
import Layout from "./components/Layout.jsx";
import NotFound from "./components/NotFound.jsx";
import { customTheme } from "./customTheme.js";
import useTitle from "./hooks/useTitle.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./features/auth/pages/RegisterPage.jsx";
import VerificationPage from "./features/auth/pages/VerificationPage.jsx";
import LoginPage from "./features/auth/pages/LoginPage.jsx";
import NavBar from "./components/navbar/index.jsx";
import { useSelector } from "react-redux";

const App = () => {
    useTitle("Чековая книжка - Стартовая страница");
    const { user } = useSelector((state) => state.auth);
    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            {user ? <NavBar /> : null}
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="auth/verify" element={<VerificationPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
            <Footer />
            <ToastContainer theme="dark" />
        </ThemeProvider>
    );
};

export default App;
