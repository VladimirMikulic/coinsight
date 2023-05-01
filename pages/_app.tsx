import '@/styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className="container pt-6 md:pt-10">
        <nav className="flex items-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400 mr-auto">
            CoinSight
          </h1>
          <a
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              'Check out CoinSight: https://coinsight-production.up.railway.app\n\nPrice predictions powered by AI!'
            )}`}
            className="group mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 256 256"
              className="fill-gray-400 group-hover:fill-gray-500"
            >
              <path
                strokeMiterlimit="10"
                d="M28 6.937c-.957.425-1.985.711-3.064.84a5.343 5.343 0 0 0 2.345-2.951 10.696 10.696 0 0 1-3.388 1.295 5.334 5.334 0 0 0-9.089 4.864A15.143 15.143 0 0 1 3.809 5.411a5.321 5.321 0 0 0-.721 2.683 5.33 5.33 0 0 0 2.372 4.439 5.323 5.323 0 0 1-2.416-.667v.067a5.335 5.335 0 0 0 4.279 5.23 5.336 5.336 0 0 1-2.409.092 5.34 5.34 0 0 0 4.983 3.705 10.699 10.699 0 0 1-6.625 2.284c-.43 0-.855-.025-1.273-.075a15.102 15.102 0 0 0 8.177 2.396c9.812 0 15.176-8.128 15.176-15.177 0-.231-.005-.461-.015-.69A10.855 10.855 0 0 0 28 6.937z"
                fontFamily="none"
                fontSize="none"
                fontWeight="none"
                textAnchor="none"
                transform="scale(8.53333)"
              />
            </svg>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/VladimirMikulic/coinsight"
            aria-label="View Project on GitHub"
            className="group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 30 30"
              className="fill-gray-400 group-hover:fill-gray-500"
            >
              <path d="M15 3C8.373 3 3 8.373 3 15c0 5.623 3.872 10.328 9.092 11.63a1.751 1.751 0 0 1-.092-.583v-2.051h-1.508c-.821 0-1.551-.353-1.905-1.009-.393-.729-.461-1.844-1.435-2.526-.289-.227-.069-.486.264-.451.615.174 1.125.596 1.605 1.222.478.627.703.769 1.596.769.433 0 1.081-.025 1.691-.121.328-.833.895-1.6 1.588-1.962-3.996-.411-5.903-2.399-5.903-5.098 0-1.162.495-2.286 1.336-3.233-.276-.94-.623-2.857.106-3.587 1.798 0 2.885 1.166 3.146 1.481A8.993 8.993 0 0 1 15.495 9c1.036 0 2.024.174 2.922.483C18.675 9.17 19.763 8 21.565 8c.732.731.381 2.656.102 3.594.836.945 1.328 2.066 1.328 3.226 0 2.697-1.904 4.684-5.894 5.097C18.199 20.49 19 22.1 19 23.313v2.734c0 .104-.023.179-.035.268C23.641 24.676 27 20.236 27 15c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </nav>
      </header>
      <Component {...pageProps} />
      <footer className="flex justify-center items-center text-gray-500 text-center text-xs pb-4">
        <p>
          <span>Hackathon by </span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://mindsdb.com"
            className="underline"
          >
            MindsDB
          </a>
          <span> x </span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://hashnode.com"
            className="underline"
          >
            Hashnode
          </a>
          .
        </p>
        <p>
          <span>&nbsp;Icons by </span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://icons8.com"
            className="underline"
          >
            Icons8
          </a>
          .
        </p>
      </footer>
    </>
  );
}
