// test-utils.js
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// Import your own reducer
import reducer from 'src/reducers';

function render(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {},
) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  const rendered = rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
  return rendered;
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
