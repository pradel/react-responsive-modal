import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

// eslint-disable-next-line react/prefer-stateless-function
export default class HTML extends React.Component {
  static propTypes = {
    body: PropTypes.string,
    headComponents: PropTypes.any,
    postBodyComponents: PropTypes.any,
  };

  static defaultProps = {
    body: null,
    headComponents: null,
    postBodyComponents: null,
  };

  render() {
    const head = Helmet.rewind();

    let css;
    if (process.env.NODE_ENV === 'production') {
      css = (
        <style
          dangerouslySetInnerHTML={{
            // eslint-disable-next-line global-require,import/no-webpack-loader-syntax
            __html: require('!raw!../public/styles.css'),
          }}
        />
      );
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {this.props.headComponents}
          {css}
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}
