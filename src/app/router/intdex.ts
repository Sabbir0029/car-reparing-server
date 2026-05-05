import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";

export const router = Router();

const ModulesRoutes=[
    {
        path:"/user",
        route:userRoutes,
    },
    {
        path:"/auth",
        route:authRoutes,
    }
]

ModulesRoutes.forEach((route)=>{
    router.use(route.path, route.route);
});
