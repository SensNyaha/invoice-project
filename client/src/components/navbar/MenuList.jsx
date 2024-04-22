import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BarChartIcon from "@mui/icons-material/BarChart";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import useAuthUser from "../../hooks/useAuthUser";

const StyledList = styled(List)({
    "&:hover": {
        backgroundColor: "#555a64",
    },
});

const StyledSideMenuDivider = styled(Divider)({
    height: "2px",
    borderColor: "#ffffff63",
});

const MenuList = () => {
    const navigate = useNavigate();

    const { isAdmin } = useAuthUser();

    return (
        <Box>
            <StyledList>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/profile")}>
                        <ListItemIcon sx={{ minWidth: "unset", mr: "10px" }}>
                            <ManageAccountsIcon
                                sx={{ fontSize: 40 }}
                                color="green"
                            />
                        </ListItemIcon>
                        <ListItemText primary="Изменить профиль" />
                    </ListItemButton>
                </ListItem>
            </StyledList>
            <StyledSideMenuDivider />

            <StyledList>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/dashboard")}>
                        <ListItemIcon sx={{ minWidth: "unset", mr: "10px" }}>
                            <BarChartIcon
                                sx={{ fontSize: 40 }}
                                color="indigo"
                            />
                        </ListItemIcon>
                        <ListItemText primary="Панель управления" />
                    </ListItemButton>
                </ListItem>
            </StyledList>
            <StyledSideMenuDivider />

            <StyledList>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/documents")}>
                        <ListItemIcon sx={{ minWidth: "unset", mr: "10px" }}>
                            <PointOfSaleIcon
                                sx={{ fontSize: 40 }}
                                color="orange"
                            />
                        </ListItemIcon>
                        <ListItemText primary="Документы" />
                    </ListItemButton>
                </ListItem>
            </StyledList>
            <StyledSideMenuDivider />

            <StyledList>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/customers")}>
                        <ListItemIcon sx={{ minWidth: "unset", mr: "10px" }}>
                            <PeopleAltOutlinedIcon
                                sx={{ fontSize: 40 }}
                                color="blue"
                            />
                        </ListItemIcon>
                        <ListItemText primary="Заказчики" />
                    </ListItemButton>
                </ListItem>
            </StyledList>
            <StyledSideMenuDivider />

            {isAdmin && (
                <StyledList>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/users")}>
                            <ListItemIcon
                                sx={{ minWidth: "unset", mr: "10px" }}
                            >
                                <AdminPanelSettingsIcon
                                    sx={{ fontSize: 40 }}
                                    color="yellow"
                                />
                            </ListItemIcon>
                            <ListItemText primary="Панель администратора" />
                        </ListItemButton>
                    </ListItem>
                </StyledList>
            )}
        </Box>
    );
};

export default MenuList;
