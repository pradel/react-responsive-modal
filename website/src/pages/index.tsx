import preval from 'babel-plugin-preval/macro';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const file = preval`
const fs = require('fs');
const path = require('path');
module.exports = fs.readFileSync(require.resolve(path.join(__dirname, '../examples/simple.tsx')), 'utf8');
`;

console.log(file);

const IndexPage = () => (
  <div className="container px-4">
    Hello
    <div>
      <LiveProvider code={file} scope={{ Modal }}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    </div>
  </div>
);

export default IndexPage;
