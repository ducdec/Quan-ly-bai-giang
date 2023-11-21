// customRenderer.js
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async (filePath, options, callback) => {
  try {
    const fullPath = `${__dirname}/views/${filePath}.js`;
    const content = await fs.readFile(fullPath, 'utf8');

    // Assuming the JavaScript file exports a function
    const viewFunction = new Function('data', content);

    // Render the view function with the provided options
    const renderedContent = viewFunction(options);

    return callback(null, renderedContent);
  } catch (error) {
    return callback(new Error(`Error reading file: ${error.message}`));
  }
};
