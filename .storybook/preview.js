/* global window */

import {
  addParameters,
  setCustomElements,
} from '@storybook/web-components';

import customElements from '../custom-elements.json';

setCustomElements(customElements);

addParameters({
  docs: {
    // inlineStories: false,
    // iframeHeight: '200px',
  },
});
