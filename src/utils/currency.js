// WeightBuddy Multi-Currency Engine
// Default base currency is INR (₹) with dynamic manual override

export const CURRENCY_MAP = {
  INR: { label: 'INR (₹) - Default', symbol: '₹', rate: 1 },
  USD: { label: 'USD ($)', symbol: '$', rate: 0.012 },
  EUR: { label: 'EUR (€)', symbol: '€', rate: 0.011 },
  GBP: { label: 'GBP (£)', symbol: '£', rate: 0.0094 },
  CAD: { label: 'CAD ($)', symbol: 'CAD $', rate: 0.016 },
  AUD: { label: 'AUD ($)', symbol: 'AUD $', rate: 0.018 },
  AED: { label: 'AED (د.إ)', symbol: 'AED ', rate: 0.044 },
  SGD: { label: 'SGD ($)', symbol: 'SGD $', rate: 0.016 },
};

export const formatCurrency = (priceInr = 50, currencyCode = 'INR') => {
  const curr = CURRENCY_MAP[currencyCode] || CURRENCY_MAP.INR;
  const converted = priceInr * curr.rate;

  if (currencyCode === 'INR') {
    return `${curr.symbol}${Math.round(converted)}`;
  }
  return `${curr.symbol}${converted.toFixed(2)}`;
};
