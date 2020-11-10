// import preval from 'babel-plugin-preval/macro';
// import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import 'react-responsive-modal/styles.css';
// import { Modal } from 'react-responsive-modal';
// @ts-ignore
import Content from '../examples/index.mdx';
import { Footer } from '../components/Footer';

// const file = preval`
// const fs = require('fs');
// const path = require('path');
// module.exports = fs.readFileSync(require.resolve(path.join(__dirname, '../examples/simple.tsx')), 'utf8');
// `;

const IndexPage = () => (
  <>
    <div className="container px-6 xl:px-12 mt-20 max-w-3xl prose lg:prose-lg">
      <Content />
    </div>

    <Footer />
  </>
);

export default IndexPage;
