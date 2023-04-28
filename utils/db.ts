import { Currency, CurrencyPriceResult, formatDate } from '@/utils/common';
import MindsDB, { SqlQueryResult } from 'mindsdb-js-sdk';

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

          return getCurrencyPrice(currency, date);
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

// Requests to MindsDB may occasionally fail or return result with an error message
// In that case, simply retrying will resolve the issue.
async function getCurrencyPrice(
  currency: Currency,
  date: Date,
  retryCount = 1
): Promise<SqlQueryResult> {
  const currRetry = typeof retryCount === 'number' ? retryCount : 1;
  try {
    const result = await MindsDB.SQL.runQuery(
      `SELECT * FROM mindsdb.${currency}_predictor WHERE date="${formatDate(
        date
      )}"`
    );

    if (result.error_message) throw new Error(result.error_message);
    return result;
  } catch (e) {
    // @ts-ignore Fix for Error: model 'x' is obsolete and needs to be updated. Run 'RETRAIN x;'
    if (e.message?.includes?.('is obsolete')) {
      await MindsDB.SQL.runQuery(`RETRAIN ${currency}_predictor`);
      await new Promise(resolve => setTimeout(resolve, 30000));
    }

    console.log(`Retry ${currRetry} failed.`, e);
    if (currRetry > 10) {
      console.log(`All ${10} retry attempts exhausted`);
      throw e;
    }

    await new Promise(resolve => setTimeout(resolve, 3000));
    return getCurrencyPrice(currency, date, currRetry + 1);
  }
}

export default getCurrencyPrices;
