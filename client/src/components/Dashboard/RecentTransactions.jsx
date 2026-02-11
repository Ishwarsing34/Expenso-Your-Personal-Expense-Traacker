import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from 'moment'
import TransactionInfoCard from "../Cards/TransactionInfoCard";


const RecentTransactions = ({ transactions = [], onSeeMore }) => {
    return (
        <div className="card">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">Recent Transactions</h5>

               <button
  onClick={onSeeMore}
  className="
    group
    inline-flex items-center gap-2
    text-sm font-medium
    text-purple-600
    hover:text-purple-700
    transition-all duration-200
  "
>
  <span className="relative">
    See All
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
  </span>

  <LuArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
</button>

            </div>

            {/* Transactions */}
            <div className="mt-6">
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        title={
                            item.type === "expense"
                                ? item.category
                                : item.source
                        }
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
