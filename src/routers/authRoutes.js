import { Router } from "express";
// import controllerWr from "../utils/controllerWr.js";
import { loginController, registerController } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);

export default authRouter;