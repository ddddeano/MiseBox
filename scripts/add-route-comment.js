import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Base directories to update
const baseDirs = ['pages', 'components', 'composables'];

// Resolve __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively process files
async function processFiles(directory) {
  const dirPath = path.resolve(__dirname, '..', directory);

  for (const file of fs.readdirSync(dirPath)) {
    const fullPath = path.join(dirPath, file);

    // Check if it's a directory
    if (fs.statSync(fullPath).isDirectory()) {
      await processFiles(fullPath);
    } else if (file.endsWith('.vue') || file.endsWith('.js')) {
      // Read the file
      let content = fs.readFileSync(fullPath, 'utf-8');

      // Extract relative path as a comment
      const relativePath = path.relative(process.cwd(), fullPath);
      const comment = `<!-- ${relativePath} -->`;

      // Add the comment if not already present
      if (!content.startsWith(comment)) {
        content = `${comment}\n${content}`;
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Updated: ${relativePath}`);
      }
    }
  }
}

// Process all base directories
(async () => {
  for (const dir of baseDirs) {
    await processFiles(dir);
  }
  console.log('All files updated successfully!');
})();
