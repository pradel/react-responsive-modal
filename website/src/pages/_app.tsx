import { AppProps } from 'next/app';
import 'typeface-inter';
// highlight.js theme
import '../styles/atom-one-light.css';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
