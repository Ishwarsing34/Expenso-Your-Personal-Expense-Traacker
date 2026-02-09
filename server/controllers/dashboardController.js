import IncomeModel from "../models/Income.js";
import ExpenseModel from "../models/Expense.js";
import mongoose from "mongoose";




export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // ================= TOTAL INCOME =================
    const totalIncomeAgg = await IncomeModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = totalIncomeAgg[0]?.total || 0;

    // ================= TOTAL EXPENSE =================
    const totalExpenseAgg = await ExpenseModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = totalExpenseAgg[0]?.total || 0;

    // ================= LAST 60 DAYS INCOME =================
    const last60DaysIncomeTransactions = await IncomeModel.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // ================= LAST 30 DAYS EXPENSE =================
    const last30DaysExpenseTransactions = await ExpenseModel.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // ================= RECENT TRANSACTIONS =================
    const recentIncome = (
      await IncomeModel.find({ userId })
        .sort({ date: -1 })
        .limit(5)
    ).map((txn) => ({
      ...txn.toObject(),
      type: "income",
    }));

    const recentExpense = (
      await ExpenseModel.find({ userId })
        .sort({ date: -1 })
        .limit(5)
    ).map((txn) => ({
      ...txn.toObject(),
      type: "expense",
    }));

    const recentTransactions = [...recentIncome, ...recentExpense]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    // ================= FINAL RESPONSE =================
    return res.status(200).json({
      success: true,
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense,
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      last30DaysExpense: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      recentTransactions,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};




