# Brand Logo Organization Guide

This directory contains brand logos organized with meaningful names for better file management and clarity.

## File Structure

Each brand logo follows this organized structure:

```
public/images/brands/
├── [brand-name]/
│   └── [brand-name]-logo.svg
└── README.md
```

## Current Brand Logos

### Active Brands (showing in scrolling animation):

- `champion/champion-logo.svg` - Champion brand logo
- `mercedes-benz/mercedes-benz-logo.svg` - Mercedes-Benz brand logo
- `kfc/kfc-logo.svg` - KFC brand logo

### Inactive Brands (available but not shown):

- `nike/nike-logo.svg` - Nike brand logo (placeholder)
- `adidas/adidas-logo.svg` - Adidas brand logo (placeholder)
- `apple/apple-logo.svg` - Apple brand logo (placeholder)
- `coca-cola/coca-cola-logo.svg` - Coca-Cola brand logo (placeholder)

## Adding New Brand Logos

### Manual Method:

1. Create a new folder: `mkdir public/images/brands/[brand-name]`
2. Add logo file: `[brand-name]-logo.svg` (or .png)
3. Update `src/content/brands/brands.yaml`:
   ```yaml
   - name: Brand Name
     logo: /images/brands/[brand-name]/[brand-name]-logo.svg
     isActive: true
   ```

### CMS Method (Keystatic):

1. Go to `/keystatic` → "Brand Logos"
2. Click "Add Brand"
3. Fill in brand name and upload logo
4. Toggle "Show in Animation" as needed
5. Save changes

## File Naming Conventions

- **Folder names**: lowercase, kebab-case (e.g., `coca-cola`, `mercedes-benz`)
- **File names**: `[brand-name]-logo.[ext]` (e.g., `nike-logo.svg`)
- **Supported formats**: SVG (preferred), PNG, JPG
- **Recommended size**: 300-500px width, optimized for web

## Benefits of This Structure

✅ **Clear identification** - Know which logo belongs to which brand instantly
✅ **Easy maintenance** - Update specific brand logos without confusion
✅ **Version control friendly** - Track changes to specific brand assets
✅ **Scalable** - Add hundreds of brands without file name conflicts
✅ **Developer friendly** - Meaningful paths in code and CMS
