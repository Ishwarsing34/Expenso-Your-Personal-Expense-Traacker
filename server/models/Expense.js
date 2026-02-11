import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    icon: {
      type: String,
      default: null, 
    },

    category: {
      type: String,
      required: true, 
    },

    amount: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    date: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true, 
  }
);

const ExpenseModel = mongoose.model("Expense", expenseSchema);

export default ExpenseModel;
