import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head/>
        <body>
          <Main />
          <NextScript />
          <script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "5d66f0cb9118424f98bedc9c93e2958e"}'></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
