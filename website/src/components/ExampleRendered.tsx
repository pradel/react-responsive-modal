import Simple from '../examples/Simple';
import ExampleMultiple from '../examples/Multiple';
import LongContent from '../examples/LongContent';
import FocusTrapped from '../examples/FocusTrapped';
import CustomCssStyle from '../examples/CustomCssStyle';
import CustomAnimation from '../examples/CustomAnimation';
import CustomCloseIcon from '../examples/CustomCloseIcon';
import CustomContainer from '../examples/CustomContainer';

const examples: Record<string, () => JSX.Element> = {
  simple: Simple,
  multiple: ExampleMultiple,
  longContent: LongContent,
  focusTrapped: FocusTrapped,
  customCssStyle: CustomCssStyle,
  customAnimation: CustomAnimation,
  customCloseIcon: CustomCloseIcon,
  customContainer: CustomContainer,
};

interface ExampleRenderedProps {
  name: string;
}

export const ExampleRendered = ({ name }: ExampleRenderedProps) => {
  const Example = examples[name];
  if (!Example) {
    throw new Error('example not found');
  }

  return <Example />;
};
