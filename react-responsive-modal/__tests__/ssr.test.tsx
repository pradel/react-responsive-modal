// @vitest-environment node
import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vite-plus/test';

import { Modal } from '../src';

describe('server side rendering', () => {
  it('should render an open modal without throwing', () => {
    expect(() =>
      renderToString(
        <Modal open onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      ),
    ).not.toThrow();
  });

  it('should not render the modal content on the server', () => {
    const html = renderToString(
      <Modal open onClose={() => null}>
        <div>modal content</div>
      </Modal>,
    );

    expect(html).not.toContain('modal content');
  });

  it('should render a closed modal without throwing', () => {
    expect(() =>
      renderToString(
        <Modal open={false} onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      ),
    ).not.toThrow();
  });
});
