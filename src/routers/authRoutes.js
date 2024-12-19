import { Router } from "express";
import controllerWr from "../utils/controllerWr.js";
import { getGoogleOAuthUrlController, loginController, loginWithGoogleController, logoutController, refreshUserSessionController, registerController, requestResetEmailController, resetPassController } from "../controllers/authController.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { loginUserSchema, loginWithGoogleOAuthSchema, registerUserSchema, requestResetEmailSchema, resetPassSchema } from "../validation/auth.js";

const authRouter = Router();

//basic
authRouter.post('/register', validateMiddleware(registerUserSchema), controllerWr(registerController));
authRouter.post('/login', validateMiddleware(loginUserSchema), controllerWr(loginController));
authRouter.post('/logout', controllerWr(logoutController));
authRouter.post('/refresh', controllerWr(refreshUserSessionController));

//email reset
authRouter.post('/request-reset-email', validateMiddleware(requestResetEmailSchema), controllerWr(requestResetEmailController));
authRouter.post('/reset-password/', validateMiddleware(resetPassSchema), controllerWr(resetPassController));

//google Oauth
authRouter.get('/get-oauth-url', controllerWr(getGoogleOAuthUrlController));
authRouter.post('/confirm-google-auth', validateMiddleware(loginWithGoogleOAuthSchema), controllerWr(loginWithGoogleController));

//http://localhost:5173/confirm-google-auth
//https://tmdb-movies-library.vercel.app/confirm-google-auth

export default authRouter;