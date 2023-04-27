export type Currency = (typeof currencies)[number];

export type CurrencyPriceResult = {
  price: number;
  date: string;
};

export const currencies = ['btc', 'eth', 'sol', 'xmr', 'doge', 'xrp'] as const;

export const currencyLabels: { [key in (typeof currencies)[number]]: string } =
  {
    btc: 'Bitcoin',
    eth: 'Ethereum',
    sol: 'Solana',
    xmr: 'Monero',
    doge: 'Dogecoin',
    xrp: 'XRP',
  };

export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};
