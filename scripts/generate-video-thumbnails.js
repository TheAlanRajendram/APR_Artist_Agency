import ffmpeg from 'fluent-ffmpeg';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const VIDEO_DIR = './public/videos/work/gallery';
const THUMBNAIL_DIR = './public/images/work/gallery';
const SUPPORTED_VIDEO_FORMATS = ['.mp4', '.webm', '.mov', '.avi'];

async function ensureDirectoryExists(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function generateThumbnail(videoPath, thumbnailPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .screenshots({
        timestamps: ['1'], // Capture at 1 second
        filename: path.basename(thumbnailPath),
        folder: path.dirname(thumbnailPath),
        size: '320x240' // Standard thumbnail size
      })
      .on('end', () => {
        console.log(`✅ Generated thumbnail: ${thumbnailPath}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`❌ Error generating thumbnail for ${videoPath}:`, err.message);
        reject(err);
      });
  });
}

async function findVideoFiles(dir) {
  const files = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const subFiles = await findVideoFiles(fullPath);
        files.push(...subFiles);
      } else if (SUPPORTED_VIDEO_FORMATS.includes(path.extname(entry.name).toLowerCase())) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.warn(`⚠️  Could not read directory ${dir}:`, error.message);
  }

  return files;
}

async function main() {
  console.log('🎬 Starting video thumbnail generation...');

  try {
    // Find all video files
    const videoFiles = await findVideoFiles(VIDEO_DIR);

    if (videoFiles.length === 0) {
      console.log('📹 No video files found');
      return;
    }

    console.log(`📹 Found ${videoFiles.length} video file(s)`);

    // Process each video
    for (const videoPath of videoFiles) {
      const relativePath = path.relative(VIDEO_DIR, videoPath);
      const thumbnailPath = path.join(
        THUMBNAIL_DIR,
        relativePath.replace(path.extname(relativePath), '-thumbnail.jpg')
      );

      // Ensure thumbnail directory exists
      await ensureDirectoryExists(path.dirname(thumbnailPath));

      // Check if thumbnail already exists
      try {
        await fs.access(thumbnailPath);
        console.log(`⏭️  Thumbnail already exists: ${thumbnailPath}`);
        continue;
      } catch {
        // Thumbnail doesn't exist, generate it
      }

      await generateThumbnail(videoPath, thumbnailPath);
    }

    console.log('🎉 Thumbnail generation complete!');

  } catch (error) {
    console.error('💥 Error during thumbnail generation:', error);
    process.exit(1);
  }
}

// Run the script if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateThumbnail, findVideoFiles };
