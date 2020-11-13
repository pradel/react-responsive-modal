import preval from 'babel-plugin-preval/macro';
import { Modal } from 'react-responsive-modal';
// @ts-ignore
import Content from '../examples/index.mdx';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const file = preval`
const fs = require('fs');
const path = require('path');
module.exports = fs.readFileSync(require.resolve(path.join(__dirname, '../examples/simple.tsx')), 'utf8');
`;

const IndexPage = () => (
  <>
    <Header />

    <div className="container px-6 xl:px-12 mt-32 max-w-5xl">
      <div className="md:grid md:grid-cols-7 md:gap-12">
        <aside className="md:col-span-2">
          <ul className="md:sticky mb-8 md:mb-0" style={{ top: '6rem' }}>
            <li className="mb-4">
              <a className="hover:text-watermelon" href="#installation">
                Installation
              </a>
            </li>
            <li className="mb-4">
              <a className="hover:text-watermelon" href="#usage">
                Usage
              </a>

              <ul className="ml-4 mt-4">
                <li className="mb-4">
                  <a className="text-sm hover:text-watermelon" href="#usage">
                    Multiple modals
                  </a>
                </li>
                <li className="mb-4">
                  <a className="text-sm hover:text-watermelon" href="#usage">
                    Modal with a lot of content
                  </a>
                </li>
                <li className="mb-4">
                  <a className="text-sm hover:text-watermelon" href="#usage">
                    Focus Trapped modal
                  </a>
                </li>
                <li className="mb-4">
                  <a className="text-sm hover:text-watermelon" href="#usage">
                    Custom styling with css
                  </a>
                </li>
                <li className="mb-4">
                  <a className="text-sm hover:text-watermelon" href="#usage">
                    Custom animation
                  </a>
                </li>
                <li className="mb-4">
                  <a className="text-sm hover:text-watermelon" href="#usage">
                    Using a custom close icon
                  </a>
                </li>
                <li className="mb-4">
                  <a className="text-sm hover:text-watermelon" href="#usage">
                    Using a custom container
                  </a>
                </li>
              </ul>
            </li>

            <li className="mb-4">
              <a className="hover:text-watermelon" href="#usage">
                Accessibility
              </a>
            </li>
            <li className="mb-4">
              <a className="hover:text-watermelon" href="#usage">
                Props
              </a>
            </li>
            <li className="mb-4">
              <a className="hover:text-watermelon" href="#usage">
                Licence
              </a>
            </li>
          </ul>
        </aside>
        <div className="md:col-span-5 prose lg:prose-lg">
          <Content />
        </div>
      </div>

      {/* <LiveProvider code={file} scope={{ Modal }}>
        <LivePreview className="p-3 border border-gray-400 rounded-md" />
        <LiveEditor />
        <LiveError />
      </LiveProvider> */}
    </div>

    <Footer />
  </>
);

export default IndexPage;
