import CustomAnimation from '../examples/CustomAnimation';
import CustomCloseIcon from '../examples/CustomCloseIcon';
import CustomContainer from '../examples/CustomContainer';
import CustomCssStyle from '../examples/CustomCssStyle';
import FocusTrapped from '../examples/FocusTrapped';
import FocusTrappedInitialFocus from '../examples/FocusTrappedInitialFocus';
import LongContent from '../examples/LongContent';
import ExampleMultiple from '../examples/Multiple';
import Simple from '../examples/Simple';

const examples: Record<string, () => React.ReactElement> = {
  simple: Simple,
  multiple: ExampleMultiple,
  longContent: LongContent,
  focusTrapped: FocusTrapped,
  focusTrappedInitialFocus: FocusTrappedInitialFocus,
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
