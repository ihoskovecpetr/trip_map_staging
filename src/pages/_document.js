import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class CustomDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();

    function handleCollectStyles(App) {
      return (props) => {
        return sheet.collectStyles(<App {...props} />);
      };
    }

    const page = renderPage((App) => handleCollectStyles(App));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          {this.props.styleTags}
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css"
            rel="stylesheet"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          ></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
