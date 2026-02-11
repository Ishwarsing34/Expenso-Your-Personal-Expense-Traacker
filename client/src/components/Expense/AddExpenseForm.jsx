import React, { useState } from "react";
import Input from "../Inputs/input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setExpense((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      {/* Emoji Picker */}
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) =>
          handleChange("icon", selectedIcon)
        }
      />

      {/* Category */}
      <Input
        value={expense.category}
        onChange={(value) =>
          handleChange("category", value)
        }
        label="Expense Category"
        type="text"
      />

      {/* Amount */}
      <Input
        value={expense.amount}
        onChange={(value) =>
          handleChange("amount", value)
        }
        label="Amount"
        type="number"
      />

      {/* Date */}
      <Input
        value={expense.date}
        onChange={(value) =>
          handleChange("date", value)
        }
        label="Date"
        type="date"
      />

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
