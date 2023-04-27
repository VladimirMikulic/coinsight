import { Currency, currencies, currencyLabels } from '@/utils/common';
import { Listbox } from '@headlessui/react';
import { ReactNode } from 'react';

type Props = {
  value: Currency;
  disabled: boolean;
  onChange: (value: Currency) => void;
};

export default function CurrencySelect({ value, onChange, disabled }: Props) {
  return (
    <Listbox
      value={value}
      onChange={onChange}
      as="div"
      className="relative w-full sm:w-52 my-4 sm:my-0"
      disabled={disabled}
    >
      {({ open }) => (
        <>
          <Listbox.Button className="flex items-center w-full text-gray-800 bg-white text-sm h-10 pl-3 pr-2 rounded-md border">
            {iconsMap[value]}
            <span
              className="ml-2 font-bold truncate mr-auto"
              style={{ maxWidth: '80%' }}
            >
              {currencyLabels[value]} ({value.toUpperCase()})
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Listbox.Button>
          <Listbox.Options
            style={{ maxHeight: 280 }}
            className="absolute top-0 right-0 z-10 w-full mt-12 bg-white rounded-md shadow-sm border overflow-hidden"
          >
            {currencies.map(currency => (
              <Listbox.Option
                key={currency}
                value={currency}
                className="flex space-x-2 items-center text-sm text-gray-800 hover:bg-gray-100 p-2 pl-3 h-10 cursor-default"
              >
                {iconsMap[currency]}
                <span>
                  {currencyLabels[currency]} ({currency.toUpperCase()})
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
}

const iconsMap: { [key in (typeof currencies)[number]]: ReactNode } = {
  btc: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
      <g clipPath="url(#btca)">
        <path
          fill="#F7931A"
          d="M24 12A12 12 0 1 1 .001 12 12 12 0 0 1 24 12Z"
        />
        <path
          fill="#fff"
          fillRule="evenodd"
          d="m8.529 5.48 2.758.738.616-2.297 1.379.374-.592 2.203 1.124.302.594-2.227 1.402.376-.604 2.238s2.291.507 2.83 2.37c.539 1.864-1.185 2.842-1.717 2.88 0 0 2.007 1.1 1.318 3.266-.69 2.165-2.806 2.552-5.033 2.056L12 20.081l-1.403-.376.617-2.285-1.113-.304-.617 2.302-1.392-.374.618-2.29-2.831-.764.713-1.584s.799.218 1.101.29c.302.072.496-.242.582-.557.085-.314 1.366-5.52 1.488-5.95.12-.428.072-.763-.437-.895-.508-.132-1.2-.338-1.2-.338L8.53 5.48Zm2.781 6.895-.763 3.036s3.787 1.367 4.27-.556c.485-1.923-3.507-2.48-3.507-2.48Zm.352-1.44.75-2.781s3.241.58 2.842 2.128c-.4 1.548-2.31.954-3.592.653Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="btca">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
  eth: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
      <g clipPath="url(#etha)">
        <path
          fill="#627EEA"
          d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"
        />
        <path
          fill="#fff"
          fillOpacity=".602"
          d="M12.373 3v6.652l5.623 2.513L12.374 3Z"
        />
        <path fill="#fff" d="M12.373 3 6.75 12.165l5.623-2.512V3Z" />
        <path
          fill="#fff"
          fillOpacity=".602"
          d="M12.373 16.476v4.52L18 13.212l-5.627 3.264Z"
        />
        <path fill="#fff" d="M12.373 20.996v-4.52L6.75 13.211l5.623 7.784Z" />
        <path
          fill="#fff"
          fillOpacity=".2"
          d="m12.373 15.43 5.623-3.265-5.622-2.511v5.776Z"
        />
        <path
          fill="#fff"
          fillOpacity=".602"
          d="m6.75 12.165 5.623 3.265V9.654l-5.623 2.51Z"
        />
      </g>
      <defs>
        <clipPath id="etha">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
  sol: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
      <rect width="24" height="24" fill="#000" rx="12" />
      <g clipPath="url(#a)">
        <path
          fill="url(#b)"
          d="M7.275 15.374a.458.458 0 0 1 .323-.135h11.173a.229.229 0 0 1 .162.391l-2.207 2.207a.458.458 0 0 1-.324.134H5.23a.229.229 0 0 1-.163-.39l2.208-2.207Z"
        />
        <path
          fill="url(#c)"
          d="M7.276 7.134A.47.47 0 0 1 7.6 7h11.172a.229.229 0 0 1 .162.39l-2.207 2.208a.458.458 0 0 1-.324.134H5.231a.23.23 0 0 1-.162-.39l2.207-2.208Z"
        />
        <path
          fill="url(#d)"
          d="M16.726 11.228a.458.458 0 0 0-.324-.134H5.229a.23.23 0 0 0-.162.39l2.208 2.207a.458.458 0 0 0 .323.134h11.173a.228.228 0 0 0 .161-.39l-2.206-2.207Z"
        />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1="17.703"
          x2="9.971"
          y1="5.682"
          y2="20.492"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient
          id="c"
          x1="14.324"
          x2="6.592"
          y1="3.917"
          y2="18.727"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient
          id="d"
          x1="16.002"
          x2="8.27"
          y1="4.794"
          y2="19.604"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <clipPath id="a">
          <path fill="#fff" d="M5 7h14v10.972H5z" />
        </clipPath>
      </defs>
    </svg>
  ),
  xmr: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
      <g clipPath="url(#xmra)">
        <path
          fill="#F60"
          d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"
        />
        <path
          fill="#fff"
          d="M11.977 3.926a8.112 8.112 0 0 1 7.7 10.692h-2.419v-6.82l-5.28 5.28-5.28-5.28v6.82h-2.42a8.303 8.303 0 0 1-.418-2.574 8.112 8.112 0 0 1 8.118-8.118Zm-1.209 10.339L12 15.476l1.21-1.21 2.288-2.31v4.29h3.41a8.105 8.105 0 0 1-6.93 3.894 8.13 8.13 0 0 1-6.93-3.894h3.41v-4.29l2.31 2.31v-.001Z"
        />
      </g>
      <defs>
        <clipPath id="xmraa">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
  doge: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
      <g clipPath="url(#dogea)">
        <path
          fill="#C3A634"
          d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"
        />
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M9.936 10.957h3.236v1.715H9.935v3.613h2.04c.808 0 1.47-.108 1.984-.327.514-.219.918-.52 1.211-.908a3.3 3.3 0 0 0 .597-1.361A8.548 8.548 0 0 0 15.925 12a8.548 8.548 0 0 0-.157-1.689 3.297 3.297 0 0 0-.597-1.361c-.293-.387-.697-.69-1.211-.908-.515-.219-1.176-.327-1.983-.327H9.936v3.243Zm-2.074 1.715H6.75v-1.714h1.112V6h4.911c.908 0 1.693.157 2.357.47a4.392 4.392 0 0 1 1.626 1.287c.42.543.732 1.178.937 1.907.205.728.307 1.507.307 2.336a8.603 8.603 0 0 1-.308 2.336 5.504 5.504 0 0 1-.937 1.908c-.42.543-.961.971-1.625 1.286-.664.313-1.45.47-2.357.47H7.862v-5.328Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="dogea">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
  xrp: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
      <g clipPath="url(#xrpa)">
        <path
          fill="#23292F"
          d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"
        />
        <path
          fill="#fff"
          d="M17.302 6h2.168l-4.511 4.468a4.216 4.216 0 0 1-5.918 0L4.526 6h2.171l3.428 3.392a2.667 2.667 0 0 0 3.747 0L17.302 6ZM6.672 18.422H4.5l4.541-4.495a4.216 4.216 0 0 1 5.918 0l4.541 4.495h-2.171L13.875 15a2.667 2.667 0 0 0-3.747 0L6.67 18.422h.001Z"
        />
      </g>
      <defs>
        <clipPath id="xrpa">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
};
