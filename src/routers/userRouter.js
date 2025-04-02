import { Router } from 'express';
import { protectMW } from '../middlewares/protectMiddleware';
import { validateMiddleware } from '../middlewares/validateMiddleware';
import {
    getCurrentUserController,
    updateUserController,
    deleteUserController,
} from '../controllers/userControllers';
import { updateUserSchema } from '../schemas/userSchemas';

const userRouter = Router();

// Получение информации о текущем пользователе
userRouter.get('/me', protectMW, getCurrentUserController);

// Обновление данных пользователя
userRouter.patch('/update', protectMW, validateMiddleware(updateUserSchema), updateUserController);

// Удаление аккаунта
userRouter.delete('/delete', protectMW, deleteUserController);

export default userRouter;
