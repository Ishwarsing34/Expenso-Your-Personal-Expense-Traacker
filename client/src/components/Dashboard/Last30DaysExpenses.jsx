import React from "react";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareExpenseBarChartData } from "../../utils/helper";

const Last30DaysExpenses = ({ data }) => {


  console.log("this is data : - " , data );
  
  // Safely handle undefined or empty data
  const chartData = prepareExpenseBarChartData(data || []);
  

  console.log("this is chartdata :- " , chartData )
  return (
    <div className="card col-span-1 md:col-span-2">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>

      <div className="mt-6">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default Last30DaysExpenses;
