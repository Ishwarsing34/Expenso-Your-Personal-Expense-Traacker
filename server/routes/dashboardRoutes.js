import express from 'express'
import { protect } from '../middlewares/authMiddleware.js';
import { getDashboardData } from '../controllers/dashboardController.js';






const dashRouter = express.Router();


dashRouter.get("/", protect , getDashboardData)


export default dashRouter;




