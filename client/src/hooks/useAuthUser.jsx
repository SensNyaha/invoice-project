import { decodeToken } from "react-jwt";
import { useSelector } from "react-redux";
import { selectCurrentUserToken } from "../features/auth/authSlice.js";

const useAuthUser = () => {
    const token = useSelector(selectCurrentUserToken);
    let isAdmin = false;

    let accessRights = "User";

    if (token) {
        const decodedToken = decodeToken(token);
        const { roles } = decodedToken;
        isAdmin = roles.includes("Admin");

        if (isAdmin) accessRights = "Admin";
        return { roles, isAdmin, accessRights };
    }

    return { roles: [], isAdmin, accessRights };
};
export default useAuthUser;
