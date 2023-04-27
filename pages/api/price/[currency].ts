import { CurrencyPriceResult, currencies } from '@/utils/common';
import getCurrencyPrices from '@/utils/db';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = CurrencyPriceResult[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const currency = req.query.currency as string;

  // @ts-ignore
  if (!currencies.includes(currency))
    return res.status(400).end('Unsupported currency');

  const fromDate = new Date(req.query.fromDate as string);
  const toDate = new Date(req.query.toDate as string);

  if (!isFinite(fromDate.getTime()) || !isFinite(toDate.getTime()))
    return res.status(400).end('Invalid date range.');

  // @ts-ignore
  const priceResults = await getCurrencyPrices(currency, fromDate, toDate);
  res.status(200).json(priceResults);
}
