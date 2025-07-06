# Video Thumbnail Generation Scripts

This directory contains scripts to automatically generate thumbnails from video files and update your content files to reference them.

## Prerequisites

1. **Install FFmpeg**: You need FFmpeg installed on your system
   - **macOS**: `brew install ffmpeg`
   - **Ubuntu/Debian**: `sudo apt install ffmpeg`
   - **Windows**: Download from [FFmpeg.org](https://ffmpeg.org/download.html)

2. **Install dependencies**: `npm install`

## Available Scripts

### `npm run generate-thumbnails`

Automatically generates thumbnail images from all video files in `/public/videos/work/gallery/`

- Captures frame at 1 second into each video
- Saves thumbnails as `*-thumbnail.jpg` in corresponding `/public/images/work/gallery/` directories
- Skips videos that already have thumbnails

### `npm run update-thumbnails`

Updates your MDX content files to automatically reference the generated thumbnails

- Scans all `.mdx` files in `/src/content/work/`
- Adds `thumbnail:` fields to video entries that don't have them
- Only updates videos where corresponding thumbnails exist

### `npm run process-videos`

Runs both scripts in sequence (recommended workflow)

## How It Works

### 1. Thumbnail Generation

The script finds all video files and generates thumbnails:

```
/public/videos/work/gallery/my-project/video.mp4
↓
/public/images/work/gallery/my-project/video-thumbnail.jpg
```

### 2. Content Update

Updates your frontmatter from:

```yaml
gallery:
  - media:
      discriminant: video
      value:
        file: /videos/work/gallery/my-project/video.mp4
    caption: Behind the scenes video
```

To:

```yaml
gallery:
  - media:
      discriminant: video
      value:
        file: /videos/work/gallery/my-project/video.mp4
        thumbnail: /images/work/gallery/my-project/video-thumbnail.jpg
    caption: Behind the scenes video
```

## Automated Workflow

The scripts are automatically run before each build:

- `npm run build` → `npm run process-videos` → build

This ensures thumbnails are always up-to-date in production.

## Manual Usage

### Generate thumbnails for new videos:

```bash
npm run generate-thumbnails
```

### Update content files after adding thumbnails:

```bash
npm run update-thumbnails
```

### Do both:

```bash
npm run process-videos
```

## Configuration

### Thumbnail Settings

Edit `scripts/generate-video-thumbnails.js`:

- `timestamps: ['1']` - Change to capture at different time (e.g., `['2']` for 2 seconds)
- `size: '320x240'` - Change thumbnail dimensions
- `SUPPORTED_VIDEO_FORMATS` - Add/remove supported video formats

### Directory Paths

Both scripts use these directories:

- Videos: `/public/videos/work/gallery/`
- Thumbnails: `/public/images/work/gallery/`
- Content: `/src/content/work/`

## Troubleshooting

### FFmpeg not found

```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt update && sudo apt install ffmpeg

# Windows - add FFmpeg to PATH or set environment variables:
FFMPEG_PATH="C:/ffmpeg/bin/ffmpeg.exe"
FFPROBE_PATH="C:/ffmpeg/bin/ffprobe.exe"
```

### Permission errors

Make sure the scripts have execution permissions:

```bash
chmod +x scripts/*.js
```

### Existing thumbnails

The scripts skip existing thumbnails by default. To regenerate all thumbnails, delete them first:

```bash
find public/images/work/gallery -name "*-thumbnail.jpg" -delete
npm run generate-thumbnails
```

## Benefits

✅ **Automatic**: Thumbnails generated on every build
✅ **Fast**: Only processes new videos
✅ **Consistent**: Standard thumbnail size and timing
✅ **CMS Integration**: Works seamlessly with Keystatic
✅ **Performance**: Improves page load times with poster images
