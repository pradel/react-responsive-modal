import { AppProps } from 'next/app';
import 'typeface-inter';
import 'react-responsive-modal/styles.css';
import '../examples/custom-styling.css';
import '../examples/custom-animation.css';
// highlight.js theme
import '../styles/atom-one-light.css';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
