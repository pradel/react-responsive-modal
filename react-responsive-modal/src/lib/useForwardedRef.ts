// https://github.com/Bedrock-Layouts/Bedrock/blob/main/packages/use-forwarded-ref/src/index.tsx v2.0.16

import React, { useRef } from 'react';

import { useStatefulRef } from './useStatefulRef';

export interface Config {
  isStateful: boolean;
}

export function useForwardedRef<T>(
  forwardedRef?: React.Ref<T>,
  config: Config = { isStateful: true },
): React.MutableRefObject<T> {
  const statefulRef = useStatefulRef<T>();
  const ref = useRef<T>(undefined);

  const innerRef = config.isStateful ? statefulRef : ref;

  // @ts-expect-error
  React.useImperativeHandle(forwardedRef, () => innerRef.current);

  return innerRef as React.MutableRefObject<T>;
}
