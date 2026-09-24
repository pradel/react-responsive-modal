// https://github.com/Bedrock-Layouts/Bedrock/blob/main/packages/use-stateful-ref/__tests__/useStatefulRef.test.tsx v2.0.16

import React, { act } from 'react';
import ReactDOM from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest';

import { useStatefulRef } from '../useStatefulRef';

vi.spyOn(React, 'useState');

let state = undefined;

const setState = vi.fn((newState) => {
  state = newState;
});

// @ts-expect-error
React.useState.mockImplementation((initialValue) => {
  state = initialValue;
  return [state, setState];
});

let statefulRef: React.MutableRefObject<unknown> | undefined;

const HookWrapper = ({
  value,
  initialValue,
}: {
  value: unknown;
  initialValue: unknown;
}) => {
  statefulRef = useStatefulRef(initialValue);
  if (value) {
    statefulRef.current = value;
  }
  return null;
};

describe('useStatefulRef', () => {
  let container: Node;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    state = undefined;
    statefulRef = undefined;
    document.body.removeChild(container);
    // @ts-expect-error
    container = null;
    setState.mockRestore();
  });

  test('useStatefulRef is not null', () => {
    expect(useStatefulRef).toBeTruthy();
  });

  it('should call useState', () => {
    act(() => {
      // @ts-expect-error
      ReactDOM.createRoot(container).render(
        <HookWrapper value={undefined} initialValue={undefined} />,
      );
    });

    expect(React.useState).toBeCalled();
  });

  it('should call setState when setting value', () => {
    act(() => {
      // @ts-expect-error
      ReactDOM.createRoot(container).render(
        <HookWrapper initialValue="Testing" value="Test" />,
      );
    });

    expect(setState).toBeCalled();
    expect(statefulRef).toMatchSnapshot();
  });

  it('should call not call setState when setting value to same value', () => {
    expect(setState).not.toBeCalled();

    act(() => {
      // @ts-expect-error
      ReactDOM.createRoot(container).render(
        <HookWrapper initialValue="Test" value="Test" />,
      );
    });

    expect(setState).not.toBeCalled();

    expect(setState.mock.calls).toMatchSnapshot();
  });
});
