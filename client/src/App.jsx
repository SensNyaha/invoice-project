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

const App = () => {
    useTitle("Чековая книжка - Стартовая страница");
    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="register" element={<RegisterPage />} />

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
            <Footer />
            <ToastContainer theme="dark" />
        </ThemeProvider>
    );
};

export default App;
