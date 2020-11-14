// @ts-ignore
import Content from '../docs/index.mdx';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

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
                  <a
                    className="text-sm hover:text-watermelon"
                    href="#multiple-modals"
                  >
                    Multiple modals
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className="text-sm hover:text-watermelon"
                    href="#modal-with-a-lot-of-content"
                  >
                    Modal with a lot of content
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className="text-sm hover:text-watermelon"
                    href="#focus-trapped-modal"
                  >
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
    </div>

    <Footer />
  </>
);

export default IndexPage;
