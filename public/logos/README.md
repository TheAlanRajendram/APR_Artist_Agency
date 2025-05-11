# Client & Partner Logos

Place all client and partner logo files in this directory for use in the "About Us" page partners section. The system will automatically display these logos in a responsive grid.

## Guidelines for Best Results

1. **Preferred Formats**
   - SVG format is strongly recommended for crisp display at all screen sizes
   - PNG with transparent background is acceptable as an alternative
   - White/light colored versions preferred for contrast against dark backgrounds

2. **Naming Convention**
   - Use kebab-case format: `brand-name.svg` (lowercase with hyphens)
   - Names will be automatically converted to display format (e.g., "Brand Name")
   - Examples: `adidas.svg`, `warner-bros.svg`, `louis-vuitton.svg`

3. **Technical Specifications**
   - Optimal aspect ratio: approximately 3:1 (landscape orientation)
   - Keep file sizes under 200KB for optimal loading performance
   - For SVGs, optimize using a tool like SVGO before adding
   - Recommended dimensions: 300-500px width

## Implementation Details

The logos display in a responsive grid with the following characteristics:
- Automatically adapts from 2 to 4 columns based on screen size
- Displays logos with proper spacing and centered alignment
- Maximum height constrained to ensure visual consistency

## Adding New Logos

Simply add new logo files to this directory following the guidelines above, and they will automatically appear on the About page. No code changes required.
