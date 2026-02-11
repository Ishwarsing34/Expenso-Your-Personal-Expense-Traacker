// import moment from "moment"



export const validateEmail = (email) => {
  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  return regex.test(email);
};



export const getInitials = (name) => {
  if (!name) return "";

  const words = name.trim().split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    if (words[i]) {
      initials += words[i][0];
    }
  }

  return initials.toUpperCase();
};



export const addThousandsSeparator = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");

  const formattedInteger = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};


export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};



// export const prepareIncomeBarChartData = (data = []) => {
//   if (!Array.isArray(data)) return [];

//   const grouped = {};

//   data.forEach((item) => {
//     const month = new Date(item.date).toLocaleString("default", {
//       month: "short",
//     });

//     if (!grouped[month]) {
//       grouped[month] = 0;
//     }

//     grouped[month] += item.amount;
//   });

//   return Object.keys(grouped).map((month) => ({
//     category: month,
//     amount: grouped[month],
//   }));
// };


export const prepareIncomeBarChartData = (data = []) => {
  if (!Array.isArray(data)) return [];

  return data
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item) => ({
      category: new Date(item.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      amount: item.amount,
    }));
};
