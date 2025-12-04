import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '..', 'public')
const logoPath = path.join(publicDir, 'images', 'logo.png')

async function generateIcons() {
  console.log('Generating icons from logo...')

  // Read the original logo
  const logo = sharp(logoPath)
  const metadata = await logo.metadata()
  console.log(`Original logo: ${metadata.width}x${metadata.height}`)

  // Generate favicon-16x16.png
  await sharp(logoPath)
    .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'))
  console.log('Created: favicon-16x16.png')

  // Generate favicon-32x32.png
  await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'))
  console.log('Created: favicon-32x32.png')

  // Generate apple-touch-icon.png (180x180)
  await sharp(logoPath)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'))
  console.log('Created: apple-touch-icon.png')

  // Generate favicon-192x192.png (for PWA)
  await sharp(logoPath)
    .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-192x192.png'))
  console.log('Created: favicon-192x192.png')

  // Generate favicon-512x512.png (for PWA)
  await sharp(logoPath)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-512x512.png'))
  console.log('Created: favicon-512x512.png')

  // Generate og-image.png (1200x630 for social sharing)
  // Create a white background with the logo centered
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([
      {
        input: await sharp(logoPath)
          .resize(400, 400, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
          .toBuffer(),
        gravity: 'center'
      }
    ])
    .png()
    .toFile(path.join(publicDir, 'og-image.png'))
  console.log('Created: og-image.png')

  // Generate favicon.ico (using 32x32 png as base)
  // Note: sharp doesn't natively support .ico, so we'll create a 32x32 PNG
  // and rename it. For a proper .ico, you'd need a dedicated tool.
  // However, modern browsers accept PNG favicons referenced in HTML.
  await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'))
  console.log('Created: favicon.ico (as PNG - works in modern browsers)')

  console.log('\nAll icons generated successfully!')
}

generateIcons().catch(console.error)
