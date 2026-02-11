import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
// import useUserAuth from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import { CreditCard } from 'lucide-react';
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import useUserAuth from "../../hooks/useUserAuth";



const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.DASHBOARD.GET_DATA
      );

      if (response?.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }


  };

  useEffect(() => {
    fetchDashboardData();
  }, []); 



  console.log(dashboardData)

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={CreditCard}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance)}
            color="bg-primary"
          />
          <InfoCard
            icon={LuWalletMinimal}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome)}
            color="bg-green-500"
          />
          <InfoCard
            icon={LuHandCoins}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense)}
            color="bg-red-600"
          />


        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

        

        </div>


        <ExpenseTransactions
          transactions={dashboardData?.last30DaysExpenses?.transactions}
          onSeeMore={() => navigate("/expense")}
        />


        <Last30DaysExpenses
          data={dashboardData?.last30DaysExpense?.transactions || []}
        />





        <RecentIncomeWithChart
          data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
          totalIncome={dashboardData?.totalIncome || 0}
        />


         
       

        <RecentIncome
          transactions={dashboardData?.last60DaysIncome?.transactions || []}
          onSeeMore={()=>navigate("/income")}
        />



      </div>
    </DashboardLayout>



  );

};

export default Home;
