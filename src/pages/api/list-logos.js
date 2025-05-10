import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Log the current directory for debugging
    console.log('Current directory:', process.cwd());

    const logoDir = path.join(process.cwd(), 'public', 'logos');
    console.log('Logo directory path:', logoDir);

    // Check if directory exists
    if (!fs.existsSync(logoDir)) {
      console.log('Logo directory does not exist');
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Get all logo files and filter out non-image files and README
    const files = fs.readdirSync(logoDir)
      .filter(file => !file.startsWith('.') && file !== 'README.md')
      .filter(file => /\.(svg|png|jpg|jpeg)$/i.test(file));

    console.log('Found logo files:', files);

    return new Response(JSON.stringify(files), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error listing logos:', error);
    return new Response(JSON.stringify({ error: 'Failed to list logos', message: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
