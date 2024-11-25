import { Router } from "express";
// import controllerWr from "../utils/controllerWr.js";
import { loginController, registerController } from "../controllers/authController.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { loginUserSchema, registerUserSchema } from "../validation/auth.js";

const authRouter = Router();

authRouter.post('/register', validateMiddleware(registerUserSchema), registerController);
authRouter.post('/login', validateMiddleware(loginUserSchema), loginController);

export default authRouter;