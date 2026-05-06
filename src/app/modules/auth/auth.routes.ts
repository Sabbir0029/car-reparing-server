import { Router } from "express";
import { authControllers } from "./auth.controllers";

const router = Router();

router.post("/login", authControllers.credentialLogin);
router.post("/refresh-token", authControllers.getNewAccessToken);
router.post("/logout", authControllers.logout);


export const authRoutes = router;