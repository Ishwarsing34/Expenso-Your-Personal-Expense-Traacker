import React, { useMemo } from "react";
import CustomPieChart from "../Charts/CustomPieChart";




const COLORS = ["#875CFF", "#4CAF50", "#FF6B6B", "#FFA500"];

const RecentIncomeWithChart = ({ data = [], totalIncome = 0 }) => {
  
  // Transform data safely using useMemo (no useEffect + no setState needed)
  const chartData = useMemo(() => {
    if (!data || !data.length) return [];

    return data.map((item) => ({
      name: item.source,
      amount: item.amount,
    }));
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
