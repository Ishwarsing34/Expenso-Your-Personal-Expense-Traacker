import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import IncomeOverview from "../../components/Income/IncomeOverview";
import AddIncomeForm from "../../components/Income/AddIncomeFom";
import toast from "react-hot-toast"
import DeleteAlert from "../../components/DeleteAlert";
import IncomeList from "../../components/Income/IncomeList";
import useUserAuth from "../../hooks/useUserAuth";


const Income = () => {

    useUserAuth();
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // replace with real income data later

  const [incomeData, setIncomeData] = useState([])

  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })




  // Get All Income Details
  // Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data?.incomes) {
        setIncomeData(response.data.incomes);
        // console.log("response data : - " , response.data)
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("this is incomedata : - ", incomeData)


  // // Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    // ✅ Validation Checks
    if (!source.trim()) {
      toast.error("Source is required.");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount: Number(amount),
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");

      fetchIncomeDetails(); // Refresh list after adding
    } catch (error) {
      console.error(
        "Error adding income:",
        error?.response?.data?.message || error.message
      );

      toast.error(
        error?.response?.data?.message || "Failed to add income"
      );
    }
  };


  // Delete Income
// Delete Income
const deleteIncome = async (id) => {
  try {
    await axiosInstance.delete(
      API_PATHS.INCOME.DELETE_INCOME(id)
    );

    setOpenDeleteAlert({ show: false, data: null });

    toast.success("Income details deleted successfully");

    fetchIncomeDetails();
  } catch (error) {
    console.error(
      "Error deleting income:",
      error?.response?.data?.message || error.message
    );

    toast.error(
      error?.response?.data?.message || "Failed to delete income"
    );
  }
};


  // Handle Download Income Details
// const handleDownloadIncomeDetails = async () => {
//   try {
//     const response = await axiosInstance.get(
//       API_PATHS.INCOME.DOWNLOAD_INCOME
//     );

//     if (!response.data?.filePath) {
//       toast.error("Failed to generate file");
//       return;
//     }

//     // Create full URL to backend file
//     const fileUrl = `http://localhost:3000/${response.data.filePath}`;

//     const link = document.createElement("a");
//     link.href = fileUrl;
//     link.setAttribute("download", "income_details.xlsx");

//     document.body.appendChild(link);
//     link.click();
//     link.remove();

//     toast.success("Downloaded successfully");

//   } catch (error) {
//     console.error("Download error:", error);
//     toast.error("Download failed");
//   }
// };

const handleDownloadIncomeDetails = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.INCOME.DOWNLOAD_INCOME + `?t=${Date.now()}`, // 🔥 cache breaker
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "income_details.xlsx");

    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    toast.success("Downloaded successfully");

  } catch (error) {
    console.error(error);
    toast.error("Download failed");
  }
};



  useEffect(() => {
    fetchIncomeDetails();

    return () => { };

  }, [])




  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) =>
              setOpenDeleteAlert({ show: true, data: id })
            }
            onDownload={handleDownloadIncomeDetails}
          />

        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>


      </div>
    </DashboardLayout>
  );
};

export default Income;
