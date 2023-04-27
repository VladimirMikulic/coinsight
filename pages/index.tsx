import Head from 'next/head';
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import getCurrencyPrices from '@/utils/db';
import { useState } from 'react';
import { Currency, CurrencyPriceResult, formatDate } from '@/utils/common';
import DatePicker from 'react-datepicker';
import CurrencySelect from '@/components/currencySelect';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const DAY_SECONDS = 86400;

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({
  initialCurrency,
  initialPriceResults,
  initialFromDateInMS,
  initialToDateInMS,
}: Props) {
  const [currency, setCurrency] = useState<Currency>(initialCurrency);
  const [priceResults, setPriceResults] = useState(initialPriceResults);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(initialFromDateInMS),
    new Date(initialToDateInMS),
  ]);

  const loadNewPriceResults = async (
    currency: Currency,
    fromDate: Date,
    toDate: Date
  ) => {
    setIsDataLoading(true);
    try {
      const response = await fetch(
        `/api/price/${currency}?fromDate=${formatDate(
          fromDate
        )}&toDate=${formatDate(toDate)}`
      );

      const newPriceResults = (await response.json()) as CurrencyPriceResult[];

      setPriceResults(newPriceResults);
      setIsDataLoading(false);
    } catch (error) {
      setIsDataLoading(false);
      alert(
        'Unexpected error occured. Please report this at https://github.com/VladimirMikulic/coinsight.'
      );
    }
  };

  return (
    <main className="container grow">
      <Head>
        <title>
          CoinSight - Cryptocurreny price predictions powered by AI.
        </title>
        <meta
          name="description"
          content="Cryptocurreny price predictions powered by AI."
        />
        <meta
          property="og:title"
          content="CoinSight - Cryptocurreny price predictions powered by AI."
        />
        <meta
          property="og:description"
          content="Cryptocurreny price predictions powered by AI."
        />
      </Head>
      <div className="flex flex-col sm:flex-row items-center my-6 md:my-10">
        <h2 className="max-w-xs xl:max-w-none w-64 md:w-auto text-lg md:text-2xl shrink-0 font-bold mr-auto">
          Cryptocurreny price predictions powered by AI.
        </h2>
        <CurrencySelect
          value={currency}
          onChange={currency => {
            setCurrency(currency);
            // @ts-ignore
            loadNewPriceResults(currency, ...dateRange);
          }}
          disabled={isDataLoading}
        />
        <DatePicker
          onChange={dateRange => {
            setDateRange(dateRange);
            if (!dateRange.includes(null)) {
              // @ts-ignore
              loadNewPriceResults(currency, ...dateRange);
            }
          }}
          minDate={new Date(initialFromDateInMS)}
          maxDate={new Date(initialFromDateInMS + 365 * DAY_SECONDS * 1000)}
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          className="!w-full sm:!w-56 h-10 w-60 border rounded-md sm:ml-2 pl-3"
          selectsRange
          disabled={isDataLoading}
        />
      </div>
      <Line
        data={{
          labels: priceResults.map(({ date }) => date),
          datasets: [
            {
              // Double space is required so tooltip label is not squished with left box
              label: '  Price (USD)',
              data: priceResults.map(({ price }) => price),
              borderColor: 'rgba(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.3)',
              pointBorderWidth: 4,
              pointBackgroundColor: 'rgba(75, 192, 192)',
              pointHoverBackgroundColor: 'rgba(75, 192, 192)',
              fill: true,
            },
          ],
        }}
        options={{
          interaction: {
            intersect: false,
          },
        }}
        className={`${isDataLoading ? 'animate-pulse' : ''} bg-white`}
      />
    </main>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const initialCurrency: Currency = 'btc';
  const initialFromDate = new Date(new Date().getTime() + DAY_SECONDS * 1000);
  const initialToDate = new Date(new Date().getTime() + 7 * DAY_SECONDS * 1000);
  const initialPriceResults = await getCurrencyPrices(
    initialCurrency,
    initialFromDate,
    initialToDate
  );

  return {
    props: {
      initialCurrency,
      initialPriceResults,
      initialFromDateInMS: initialFromDate.getTime(),
      initialToDateInMS: initialToDate.getTime(),
    },
    revalidate: 60,
  };
}
