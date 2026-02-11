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
