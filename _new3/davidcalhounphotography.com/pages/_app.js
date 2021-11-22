import { useEffect } from 'react';
import ReactGA from 'react-ga';
import '../styles/globals.css';

function CustomApp({ Component, pageProps }) {
  useEffect(() => {
    ReactGA.initialize('UA-83942647-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [pageProps])

  return <Component {...pageProps} />
}

export default CustomApp
