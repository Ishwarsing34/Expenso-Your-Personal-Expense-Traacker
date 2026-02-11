import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";
import ExpenseList from "../../components/Expense/ExpenseList";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // =========================
  // GET ALL EXPENSE DETAILS
  // =========================
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE
      );

      if (response.data?.expenses) {
        setExpenseData(response.data.expenses);
      }

    } catch (error) {
      console.log("Something went wrong.", error);
      toast.error("Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // HANDLE ADD EXPENSE
  // =========================
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category?.trim()) {
      toast.error("Category is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount: Number(amount),
        date,
        icon,
      });

      toast.success("Expense added successfully");
      setOpenAddExpenseModal(false);
      fetchExpenseDetails();

    } catch (error) {
      console.error(
        "Error adding expense:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to add expense");
    }
  };

  // =========================
  // DELETE EXPENSE
  // =========================
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(
        API_PATHS.EXPENSE.DELETE_EXPENSE(id)
      );

      toast.success("Expense deleted successfully");
      setOpenDeleteAlert({ show: false, data: null });
      fetchExpenseDetails();

    } catch (error) {
      console.error(
        "Error deleting expense:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to delete expense");
    }
  };

  // =========================
  // DOWNLOAD EXPENSE DETAILS
  // =========================
 const handleDownloadExpenseDetails = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(response.data);

    const link = document.createElement("a");
    link.href = url;
    link.download = "expense_details.xlsx";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success("Downloaded successfully");

  } catch (error) {
    console.error("Download error:", error);
    toast.error("Download ");
  }
};


  // =========================
  // LOAD ON MOUNT
  // =========================
  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">

        <ExpenseOverview
          transactions={expenseData}
          onExpenseIncome={() => setOpenAddExpenseModal(true)}
        />

        <ExpenseList
          transactions={expenseData}
          onDelete={(id) =>
            setOpenDeleteAlert({ show: true, data: id })
          }
          onDownload={handleDownloadExpenseDetails}
        />

      </div>

      {/* Add Expense Modal */}
      <Modal
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title="Add Expense"
      >
        <AddExpenseForm onAddExpense={handleAddExpense} />
      </Modal>

      {/* Delete Expense Modal */}
      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Expense"
      >
        <DeleteAlert
          content="Are you sure you want to delete this expense?"
          onDelete={() => deleteExpense(openDeleteAlert.data)}
        />
      </Modal>

    </DashboardLayout>
  );
};

export default Expense;
