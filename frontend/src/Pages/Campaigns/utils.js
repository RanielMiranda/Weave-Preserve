// src/pages/Campaigns/utils.js
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0
  }).format(amount);
};

export const getProgressPercentage = (raised, goal) => {
  return Math.min((raised / goal) * 100, 100);
};
