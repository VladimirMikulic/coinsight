import { Currency, CurrencyPriceResult, formatDate } from '@/utils/common';
import MindsDB from 'mindsdb-js-sdk';

const getCurrencyPrices = async (
  currency: Currency,
  fromDate: Date,
  toDate: Date
): Promise<CurrencyPriceResult[]> => {
  try {
    await MindsDB.connect({
      user: process.env.MINDSDB_USERNAME,
      password: process.env.MINDSDB_PASSWORD,
    });

    const diffInDays =
      (new Date(toDate).getTime() - new Date(fromDate).getTime()) /
      1000 /
      86400;

    // Price can only be retrieved for one date at a time so we <diffInDays> queries
    // (BinaryOperations are not allowed currently)
    const results = await Promise.all(
      Array(diffInDays + 1)
        .fill('')
        .map((_, index) => {
          const date = new Date(
            new Date(fromDate).getTime() + index * 86400 * 1000
          );

          return MindsDB.SQL.runQuery(
            `SELECT * FROM mindsdb.${currency}_predictor WHERE date="${formatDate(
              date
            )}"`
          );
        })
    );

    return results.map(result => ({
      price: result.rows[0].price as number,
      date: result.rows[0].date as string,
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getCurrencyPrices;
