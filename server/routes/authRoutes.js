import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';

import { registerUser , loginUser , getUserInfo} from '../controllers/authControllers.js';







const authRouter = express.Router();



authRouter.post('/register', registerUser)

authRouter.post('/login', loginUser)


authRouter.post('/getinfo',protect, getUserInfo)



export default authRouter;