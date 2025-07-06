import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONTENT_DIR = './src/content/work';
const THUMBNAIL_DIR = './public/images/work/gallery';

async function findContentFiles() {
  const files = [];
  const entries = await fs.readdir(CONTENT_DIR);

  for (const entry of entries) {
    if (entry.endsWith('.mdx')) {
      files.push(path.join(CONTENT_DIR, entry));
    }
  }

  return files;
}

async function findThumbnailForVideo(videoPath) {
  // Convert video path to potential thumbnail path
  const relativePath = videoPath.replace('/videos/', '/images/');
  const thumbnailPath = relativePath.replace(/\.(mp4|webm|mov|avi)$/i, '-thumbnail.jpg');

  // Check if thumbnail exists
  const fullThumbnailPath = path.join('./public', thumbnailPath);

  try {
    await fs.access(fullThumbnailPath);
    return thumbnailPath;
  } catch {
    return null;
  }
}

async function updateContentFile(filePath) {
  console.log(`📄 Processing: ${filePath}`);

  const content = await fs.readFile(filePath, 'utf-8');
  let updated = false;
  let newContent = content;

  // Split content into lines for easier processing
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Look for video discriminant
    if (line.includes('discriminant: video')) {
      // Find the file path (might be on next line due to YAML multiline)
      let videoPath = '';
      let fileLineIndex = -1;

      // Look for the file: line in next few lines
      for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
        if (lines[j].trim().startsWith('file:')) {
          fileLineIndex = j;
          // Handle both inline and multiline YAML
          const fileLine = lines[j];
          if (fileLine.includes('>-') || fileLine.includes('|')) {
            // Multiline - file path is on next line
            if (j + 1 < lines.length) {
              videoPath = lines[j + 1].trim();
            }
          } else {
            // Inline - extract after 'file:'
            videoPath = fileLine.split('file:')[1]?.trim();
          }
          break;
        }
      }

      if (!videoPath) continue;

      // Check if thumbnail already exists in the next few lines
      let hasThumbnail = false;
      for (let k = i; k < Math.min(i + 20, lines.length); k++) {
        if (lines[k].includes('thumbnail:')) {
          hasThumbnail = true;
          break;
        }
        // Stop if we reach the next media item or end of gallery
        if (k > i && (lines[k].includes('- media:') || lines[k].includes('caption:'))) {
          break;
        }
      }

      if (hasThumbnail) {
        console.log(`  ⏭️  Video already has thumbnail: ${videoPath}`);
        continue;
      }

      // Find corresponding thumbnail
      const thumbnailPath = await findThumbnailForVideo(videoPath);

      if (thumbnailPath) {
        console.log(`  ✅ Found thumbnail for ${videoPath}: ${thumbnailPath}`);

        // Find where to insert the thumbnail (after file, before caption)
        let insertIndex = fileLineIndex + 1;
        if (videoPath && lines[fileLineIndex + 1]?.trim() === videoPath) {
          insertIndex = fileLineIndex + 2; // After the multiline file path
        }

        // Get indentation from the file line
        const indentation = lines[fileLineIndex].match(/^(\s*)/)[1];
        const thumbnailLine = `${indentation}thumbnail: ${thumbnailPath}`;

        // Insert the thumbnail line
        lines.splice(insertIndex, 0, thumbnailLine);
        updated = true;
      } else {
        console.log(`  ❌ No thumbnail found for: ${videoPath}`);
      }
    }
  }

  if (updated) {
    newContent = lines.join('\n');
    await fs.writeFile(filePath, newContent, 'utf-8');
    console.log(`  💾 Updated: ${filePath}`);
  } else {
    console.log(`  📋 No changes needed: ${filePath}`);
  }
}

async function main() {
  console.log('🔄 Updating content files with video thumbnails...');

  try {
    const contentFiles = await findContentFiles();

    if (contentFiles.length === 0) {
      console.log('📄 No content files found');
      return;
    }

    console.log(`📄 Found ${contentFiles.length} content file(s)`);

    for (const file of contentFiles) {
      await updateContentFile(file);
    }

    console.log('🎉 Content update complete!');

  } catch (error) {
    console.error('💥 Error updating content files:', error);
    process.exit(1);
  }
}

// Run the script if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { updateContentFile, findThumbnailForVideo };
