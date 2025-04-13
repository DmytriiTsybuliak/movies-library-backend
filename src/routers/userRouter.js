import { Router } from 'express';
import { validateMiddleware } from '../middlewares/validateMiddleware.js';
import { deleteUserController, getCurrentUserController, updateUserController, uploadAvatarUserController } from '../controllers/userControllers.js';
import { protectMW } from '../middlewares/authMiddleware.js';
import { UpdateUserSchema } from '../validation/user.js';

const userRouter = Router();

userRouter.get('/me', protectMW, getCurrentUserController);

userRouter.patch('/update', protectMW, validateMiddleware(UpdateUserSchema), updateUserController);

userRouter.post('/upload-avatar', protectMW, uploadAvatarUserController);

userRouter.delete('/delete', protectMW, deleteUserController);

export default userRouter;
