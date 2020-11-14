import preval from 'babel-plugin-preval/macro';
import ExampleMultiple from '../examples/Multiple';
import LongContent from '../examples/LongContent';
import FocusTrapped from '../examples/FocusTrapped';

const examples: Record<string, () => JSX.Element> = {
  multiple: ExampleMultiple,
  longContent: LongContent,
  focusTrapped: FocusTrapped,
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
