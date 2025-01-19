import fs from 'fs';
import path from 'path';

// Base directories to scan for `index.vue`
const BASE_DIRECTORIES = [
  './pages/misebox-users',
  './pages/chefs',
  './pages/jobs',
  './pages/kitchens',
  './pages/professionals',
  './pages/recruiters',
  './pages/suppliers',
];

// Target file name
const TARGET_FILE_NAME = 'index.vue';

// Output file path
const OUTPUT_FILE = './scripts/merged/merged-main-index-pages.vue'; // Output for merged files

// Helper function to get the main `index.vue` file from a directory
const getMainIndexFile = (directoryPath, targetFile) => {
  const targetPath = path.join(directoryPath, targetFile);
  if (fs.existsSync(targetPath)) {
    return targetPath;
  }
  return null;
};

// Generate the file list for main `index.vue` files
const generateFileList = () => {
  let filesToMerge = [];
  for (const dir of BASE_DIRECTORIES) {
    if (fs.existsSync(dir)) {
      const targetFile = getMainIndexFile(dir, TARGET_FILE_NAME);
      if (targetFile) {
        filesToMerge.push(targetFile);
      }
    } else {
      console.warn(`[Warning] Directory not found: ${dir}`);
    }
  }
  return filesToMerge;
};

// List of files to merge
const FILES_TO_MERGE = generateFileList();

// Merge the files and add comments with file paths
const mergeFiles = () => {
  if (!FILES_TO_MERGE.length) {
    console.warn('[Warning] No files to merge. Please check your directories and target file.');
    return;
  }

  let mergedContent = '';

  for (const filePath of FILES_TO_MERGE) {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const relativePath = path.relative(process.cwd(), filePath);
      const commentBlock = `<!-- ============================\n${relativePath}\n============================ -->`;
      mergedContent += `\n${commentBlock}\n\n${content}\n`;
    } else {
      console.error(`[Error] File not found: ${filePath}`);
    }
  }

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });

  // Write merged content to the output file
  fs.writeFileSync(OUTPUT_FILE, mergedContent, 'utf-8');
  console.log(`Merged files written to: ${OUTPUT_FILE}`);
};

// Run the merge function
mergeFiles();
