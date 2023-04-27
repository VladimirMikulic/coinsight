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

          return retry(
            MindsDB.SQL.runQuery.bind(MindsDB.SQL),
            [
              `SELECT * FROM mindsdb.${currency}_predictor WHERE date="${formatDate(
                date
              )}"`,
            ],
            10
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

// Requests to MindsDB may occasionally or return result with an error message
// In that case, simply retrying will resolve the issue.
async function retry<T extends (...arg0: any[]) => any>(
  fn: T,
  args: Parameters<T>,
  maxTry: number,
  retryCount = 1
): Promise<Awaited<ReturnType<T>>> {
  const currRetry = typeof retryCount === 'number' ? retryCount : 1;
  try {
    const result = await fn(...args);
    if (result.error_message) throw new Error(result.error_message);
    return result;
  } catch (e) {
    console.log(`Retry ${currRetry} failed.`, e);
    if (currRetry > maxTry) {
      console.log(`All ${maxTry} retry attempts exhausted`);
      throw e;
    }
    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
    return retry(fn, args, maxTry, currRetry + 1);
  }
}

export default getCurrencyPrices;
