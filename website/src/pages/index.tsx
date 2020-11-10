import preval from 'babel-plugin-preval/macro';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const file = preval`
const fs = require('fs');
const path = require('path');
module.exports = fs.readFileSync(require.resolve(path.join(__dirname, '../examples/simple.tsx')), 'utf8');
`;

const IndexPage = () => (
  <div className="container px-4">
    <div className="grid md:grid-cols-3">
      <div className="col-span-1">I am the menu</div>
      <div className="col-span-2 prose lg:prose-lg">
        <h1>react-responsive-modal</h1>
        <p>A simple responsive and accessible react modal.</p>

        <h3>Features:</h3>
        <ul>
          <li>Focus trap inside the modal.</li>
          <li>Centered modals.</li>
          <li>Scrolling modals.</li>
          <li>Multiple modals.</li>
          <li>Accessible modals.</li>
          <li>Easily customizable via props.</li>
        </ul>

        <h3>Installation</h3>
        

        <h4>Usage</h4>
        {/* TODO lazy imports this component? */}
        <LiveProvider code={file} scope={{ Modal }}>
          <LiveEditor />
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>
    </div>
  </div>
);

export default IndexPage;
