import express from 'express';
import{
    addIncome,
    deleteIncome,
    getAllIncome,
    downloadIncomeExcel
} from "../controllers/incomeControllers.js"
import { protect } from '../middlewares/authMiddleware.js';


const incomeRouter = express.Router();




incomeRouter.post("/add", protect,addIncome)
incomeRouter.get("/get", protect,getAllIncome);
incomeRouter.delete("/delete/:id",protect,deleteIncome);
incomeRouter.get("/download-income",protect,downloadIncomeExcel)


export default incomeRouter;