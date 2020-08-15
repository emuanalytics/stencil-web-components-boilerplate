import { Config } from '@stencil/core';
import { promises as fs } from 'fs';
import { JsonDocs } from '@stencil/core/internal';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import cssnano from 'cssnano';
import purgecss from '@fullhuman/postcss-purgecss';

const purge = purgecss({
  content: ['./src/**/*.tsx', './src/index.html'],

  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

async function generateCustomElementsJson(docsData: JsonDocs) {
  const jsonData = {
    version: 1.2,
    tags: docsData.components.map((component) => ({
      name: component.tag,
      path: component.filePath,
      description: component.docs,

      attributes: component.props
        .filter((prop) => prop.attr)
        .map((prop) => ({
          name: prop.attr,
          type: prop.type,
          description: prop.docs,
          defaultValue: prop.default,
          required: prop.required
        })),

      events: component.events.map((event) => ({
        name: event.event,
        description: event.docs
      })),

      methods: component.methods.map((method) => ({
        name: method.name,
        description: method.docs,
        signature: method.signature
      })),

      slots: component.slots.map((slot) => ({
        name: slot.name,
        description: slot.docs
      })),

      cssProperties: component.styles
        .filter((style) => style.annotation === 'prop')
        .map((style) => ({
          name: style.name,
          description: style.docs
        })),

      cssParts: component.parts.map((part) => ({
        name: part.name,
        description: part.docs
      }))
    }))
  };

  await fs.writeFile(
    './custom-elements.json',
    JSON.stringify(jsonData, null, 2)
  );
}

export const config: Config = {
  namespace: 'stencil-boilerplate',
  taskQueue: 'async',
  globalStyle: 'src/styles/global.css',
  globalScript: 'src/global.ts',
  plugins: [
    postcss({
      plugins: [
        tailwindcss('./tailwind.config.js'),
        autoprefixer(),
        ...(process.env.NODE_ENV === 'production' ? [purge, cssnano()] : [])
      ]
    })
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'docs-custom',
      generator: generateCustomElementsJson
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      baseUrl: 'http://localhost:5000'
    }
  ],
  devServer: {
    openBrowser: false
  }
};
