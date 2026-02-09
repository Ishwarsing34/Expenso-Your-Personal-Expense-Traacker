import express from 'express'
import { protect } from '../middlewares/authMiddleware.js';
import {
    addExpense,
    getAllExpense,
    downloadExpenseExcel,
    deleteExpense
}  from "../controllers/expenseControllers.js"










const expenseRouter = express.Router();



expenseRouter.post("/add", protect, addExpense);
expenseRouter.get("/get", protect, getAllExpense);
expenseRouter.delete("/delete/:id", protect, deleteExpense);
expenseRouter.get("/download-expense", protect, downloadExpenseExcel);




export default expenseRouter;