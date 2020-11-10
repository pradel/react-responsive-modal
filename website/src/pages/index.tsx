import preval from 'babel-plugin-preval/macro';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
// @ts-ignore
import Content from '../examples/index.mdx';

const file = preval`
const fs = require('fs');
const path = require('path');
module.exports = fs.readFileSync(require.resolve(path.join(__dirname, '../examples/simple.tsx')), 'utf8');
`;

const IndexPage = () => (
  <div className="container px-4 prose lg:prose-lg">
    <Content />
  </div>
);

export default IndexPage;
