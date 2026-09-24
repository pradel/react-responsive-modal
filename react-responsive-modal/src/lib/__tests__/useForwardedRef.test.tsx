// https://github.com/Bedrock-Layouts/Bedrock/blob/main/packages/use-forwarded-ref/__tests__/useForwardedRef.test.tsx v2.0.16

import * as React from 'react';
import { act } from 'react';
import ReactDOM from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest';

import { useForwardedRef } from '../useForwardedRef';
import { useStatefulRef } from '../useStatefulRef';

vi.mock('../useStatefulRef', () => {
  const fn = vi.fn(() => {
    let value: unknown = undefined;
    return {
      set current(val) {
        value = val;
      },
      get current() {
        return value;
      },
    };
  });
  return {
    useStatefulRef: fn,
  };
});

let safeRef: React.MutableRefObject<unknown> | undefined;
const HookWrapper = React.forwardRef(
  ({ isStateful }: { isStateful?: boolean }, ref) => {
    const config = isStateful === undefined ? undefined : { isStateful };
    safeRef = useForwardedRef(ref, config);
    safeRef.current = 'safeRef:current';
    return null;
  },
);

describe('useForwardedRef', () => {
  let container: Node;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    safeRef = undefined;

    document.body.removeChild(container);
    // @ts-expect-error
    container = null;
  });

  test('useForwardedRef is not null', () => {
    expect(useForwardedRef).toBeTruthy();
  });

  test('useStatefulRef is called', () => {
    act(() => {
      // @ts-expect-error
      ReactDOM.createRoot(container).render(<HookWrapper />);
    });

    expect(useStatefulRef).toBeCalled();
    expect(safeRef).toMatchSnapshot();
  });

  it('should call ref callback', () => {
    const ref = vi.fn();
    act(() => {
      // @ts-expect-error
      ReactDOM.createRoot(container).render(<HookWrapper ref={ref} />);
    });
    expect(ref).toBeCalled();
  });

  it('should update a ref object', () => {
    const ref = { current: undefined };
    act(() => {
      // @ts-expect-error
      ReactDOM.createRoot(container).render(<HookWrapper ref={ref} />);
    });
    expect(ref).toMatchSnapshot();
  });
});
