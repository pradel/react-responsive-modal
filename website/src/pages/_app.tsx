import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import * as Fathom from 'fathom-client';
import { Inter } from 'next/font/google';
import 'react-responsive-modal/styles.css';
import '../examples/custom-styling.css';
import '../examples/custom-animation.css';
// highlight.js theme
import '../styles/atom-one-light.css';
import '../styles/index.css';

const inter = Inter({
  subsets: ['latin'],
});

// Record a pageview when route changes
Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

function MyApp({ Component, pageProps }: AppProps) {
  // Initialize Fathom when the app loads
  useEffect(() => {
    Fathom.load('PIMHMGXF', {
      excludedDomains: ['localhost'],
    });
  }, []);

  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
