import React, { useRef } from 'react';

/**
 * Copyright (c) 2020 Bedrock-Layouts
 * See https://github.com/Bedrock-Layouts/Bedrock/blob/main/LICENSE
 **/
function useStatefulRef<T>(initialVal = null): React.MutableRefObject<T> {
  // eslint-disable-next-line prefer-const
  let [cur, setCur] = React.useState<T | null>(initialVal);

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
export interface Config {
  isStateful: boolean;
}

/**
 * Copyright (c) 2020 Bedrock-Layouts
 * See https://github.com/Bedrock-Layouts/Bedrock/blob/main/LICENSE
 **/
export function useForwardedRef<T>(
  forwardedRef: React.Ref<T>,
  config: Config = { isStateful: true }
): React.MutableRefObject<T> {
  const statefulRef = useStatefulRef<T>(null);
  const ref = useRef<T>(null);

  const innerRef = config.isStateful ? statefulRef : ref;

  React.useEffect(() => {
    if (!forwardedRef) return;

    if (typeof forwardedRef === 'function') {
      forwardedRef(innerRef.current);
    } else {
      (forwardedRef as React.MutableRefObject<T | null>).current =
        innerRef.current;
    }
  });

  return innerRef as React.MutableRefObject<T>;
}
