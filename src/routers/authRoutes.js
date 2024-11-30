import { Router } from "express";
import controllerWr from "../utils/controllerWr.js";
import { loginController, logoutController, refreshUserSessionController, registerController } from "../controllers/authController.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { loginUserSchema, registerUserSchema } from "../validation/auth.js";

const authRouter = Router();

authRouter.post('/register', validateMiddleware(registerUserSchema), controllerWr(registerController));
authRouter.post('/login', validateMiddleware(loginUserSchema), controllerWr(loginController));
authRouter.post('/logout', controllerWr(logoutController));
authRouter.post('/refresh', controllerWr(refreshUserSessionController));

export default authRouter;