import { ADMIN, USER } from "../constants";

const ROLES = {
    User: USER,
    Admin: ADMIN
}

const checkRole = (...allowed) => {
    return (req, res, next) => {
        if (!req?.user && !req?.roles) {
            res.status(401);
            throw new Error("Authorize firstly")
        }

        const rolesArray = [...allowed];
        const roleFound = req.roles
            .map(role => rolesArray.includes(role))
            .find(value => value === true);

        if (!roleFound) {
            res.status(401);
            throw new Error("No such permissions")
        }

        next();
    }
}

export default {ROLES, checkRole};


