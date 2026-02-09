import ExpenseModel from "../models/Expense.js";
import path from 'path'




export const addExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { icon, category, amount, date, description } = req.body;

    if (!category || !amount) {
      return res.status(400).json({
        success: false,
        message: "Category and amount are required",
      });
    }

    const expense = new ExpenseModel({
      userId,
      icon,
      category,
      amount,
      description,
      date: date ? new Date(date) : new Date(),
    });

    await expense.save();

    return res.status(201).json({
      success: true,
      message: "Expense added successfully",
      expense,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAllExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await ExpenseModel.find({ userId }).sort({
      date: -1,
    });

    return res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Expense ID is required",
      });
    }

    const expense = await ExpenseModel.findOne({
      _id: id,
      userId,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    await ExpenseModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const downloadExpenseExcel = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await ExpenseModel.find({ userId }).sort({
      date: -1,
    });

    if (!expenses.length) {
      return res.status(404).json({
        success: false,
        message: "No expense records found",
      });
    }

    const excelData = expenses.map((expense) => ({
      Category: expense.category,
      Amount: expense.amount,
      Description: expense.description || "",
      Date: expense.date.toISOString().split("T")[0],
      CreatedAt: expense.createdAt.toISOString().split("T")[0],
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Expense Records"
    );

    const fileName = `expense-${userId}-${Date.now()}.xlsx`;
    const filePath = path.join("exports", fileName);

    XLSX.writeFile(workbook, filePath);

    return res.status(200).json({
      success: true,
      message: "Expense Excel file generated successfully",
      filePath,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
