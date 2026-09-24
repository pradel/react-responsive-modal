// https://github.com/Bedrock-Layouts/Bedrock/blob/main/packages/use-stateful-ref/src/index.tsx v2.0.16

import React from 'react';

export function useStatefulRef<T>(initialVal?: T): React.MutableRefObject<T> {
  let [cur, setCur] = React.useState<T | undefined>(initialVal);

  const { current: ref } = React.useRef({
    current: cur,
  });

  Object.defineProperty(ref, 'current', {
    get: () => cur as T,
    set: (value: T) => {
      if (!Object.is(cur, value)) {
        cur = value;
        setCur(value);
      }
    },
  });

  return ref as React.MutableRefObject<T>;
}
