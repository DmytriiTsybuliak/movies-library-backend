import { Router } from "express";
// import controllerWr from "../utils/controllerWr.js";
import { loginController, registerController } from "../controllers/authController.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { registerUserSchema } from "../validation/auth.js";

const authRouter = Router();

authRouter.post('/register', validateMiddleware(registerUserSchema), registerController);
authRouter.post('/login', loginController);

export default authRouter;