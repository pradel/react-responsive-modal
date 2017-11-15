/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import '../css/normalize.css';
import '../css/stylesheet.css';
import '../css/github-light.css';
import '../css/prism-okaidia.css';
import '../css/style.css';
import Centered from '../examples/centered';
import Big from '../examples/big';
import Multiple from '../examples/multiple';
import CustomStyling from '../examples/custom-styling';
import CustomAnimation from '../examples/custom-animation';
import Css from '../examples/css';

export default class ModalDemo extends React.Component {
  static propTypes = {
    data: PropTypes.any.isRequired,
  };

  render() {
    const { site, markdownRemark } = this.props.data;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{site.siteMetadata.title}</title>
          <meta name="description" content={site.siteMetadata.description} />
        </Helmet>
        <section className="page-header">
          <h1 className="project-name">react-responsive-modal</h1>
          <h2 className="project-tagline">Simple responsive modal for react</h2>
          <a
            href="https://github.com/pradel/react-responsive-modal"
            className="btn"
          >
            View on GitHub
          </a>
        </section>

        <section className="main-content">
          <h1>
            <a
              id="example"
              className="anchor"
              href="#example"
              aria-hidden="true"
            >
              <span className="octicon octicon-link" />
            </a>
            Examples
          </h1>

          <div className="examples">
            <Centered />
            <Big />
            <Multiple />
            <CustomStyling />
            <CustomAnimation />
            <Css />
          </div>

          <div
            style={{ marginTop: 20 }}
            dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
          />

          <footer className="site-footer">
            <span className="site-footer-owner">
              <a href="https://github.com/pradel/react-responsive-modal">
                react-responsive-modal
              </a>{' '}
              is maintained by <a href="https://github.com/pradel">pradel</a>.
            </span>

            <span className="site-footer-credits">
              This page is using the{' '}
              <a href="https://github.com/jasonlong/cayman-theme">
                Cayman theme
              </a>{' '}
              by <a href="https://twitter.com/jasonlong">Jason Long</a>.
            </span>
          </footer>
        </section>
      </div>
    );
  }
}

// eslint-disable-next-line
export const pageQuery = graphql`
  query BlogPostByPath {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark {
      id
      html
    }
  }
`;
