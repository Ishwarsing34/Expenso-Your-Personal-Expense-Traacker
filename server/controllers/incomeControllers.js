import userModel from "../models/User.js"
import IncomeModel from "../models/Income.js"
import path from 'path'
import XLSX from "xlsx"


//add income source   
export const addIncome = async (req, res) => {
  try {
    const userId = req.user.id;

    const { icon, source, amount, date } = req.body;

    // Validation
    if (!source || !amount) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newIncome = new IncomeModel({
      userId,
      icon,
      source,
      amount,
      date: date ? new Date(date) : new Date(),
    });

    await newIncome.save();

    return res.status(201).json({
      success: true,
      message: "Income added successfully",
      income: newIncome,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const getAllIncome = async (req, res) => { 
  try {
    const userId = req.user.id;

    const incomes = await IncomeModel.find({ userId }).sort({
      date: -1,
    });

    return res.status(200).json({
      success: true,
      count: incomes.length,
      incomes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const deleteIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Income ID is required",
      });
    }

    const income = await IncomeModel.findOne({
      _id: id,
      userId,
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    await IncomeModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Income deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};




export const downloadIncomeExcel = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Fetch income data
    const incomes = await IncomeModel.find({ userId }).sort({
      date: -1,
    });

    if (!incomes.length) {
      return res.status(404).json({
        success: false,
        message: "No income records found",
      });
    }

    // 2. Format data
    const excelData = incomes.map((income) => ({
      Source: income.source,
      Amount: income.amount,
      Date: income.date.toISOString().split("T")[0],
      CreatedAt: income.createdAt.toISOString().split("T")[0],
    }));

    // 3. Create workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Income Records");

    // 4. File path (unique per user)
    const fileName = `income-${userId}-${Date.now()}.xlsx`;
    const filePath = path.join("exports", fileName);

    // 5. Save file to backend
    XLSX.writeFile(workbook, filePath);

    // 6. Respond
    return res.status(200).json({
      success: true,
      message: "Excel file generated successfully",
      filePath,
    });
  } catch (error) {
    console.error("Excel Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
