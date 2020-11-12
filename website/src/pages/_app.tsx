import { AppProps } from 'next/app';
import 'typeface-inter';
import 'react-responsive-modal/styles.css';
// highlight.js theme
import '../styles/atom-one-light.css';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
