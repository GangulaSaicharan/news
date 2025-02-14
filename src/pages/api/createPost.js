import { IncomingForm } from 'formidable'
import { uploadFiles } from 'src/lib/cloudinary-upload'
import dbConnect from 'src/lib/mongodb'
import post from 'src/models/post'
import path from 'path'
import fs from 'fs'

// Disable Next.js body parser for the API route
export const config = {
  api: {
    bodyParser: false // Important to disable Next.js body parser for file uploads
  }
}

export default async function POST(req, res) {
  console.log('POST method called')
  const uploadDir = path.join(process.cwd(), 'public/uploads')
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }
  const form = new IncomingForm({ multiples: true })
  form.uploadDir = uploadDir
  form.keepExtensions = true // Retain file extensions like .jpg, .png
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err)
      return res.status(500).json({ error: 'Error processing file upload' })
    }
    const parsedFields = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
    )

    const { subtitle, title, newsType, englishTitle, slug, content, hashtags, category, subcategory, tags, keywords } =
      parsedFields

    // Handle hashtags and keywords to convert them to arrays if they are not already
    const hashtagsArray = hashtags ? hashtags.split(',').map(tag => tag.trim()) : []
    const keywordsArray = keywords ? keywords.split(',').map(keyword => keyword.trim()) : []

    console.log(files.images, 'files.images')

    // 🔥 Ensure `files.images` is always an array
    let uploadedImages = []
    let imgs = []
    if (files.images) {
      const imagesArray = Array.isArray(files.images) ? files.images : [files.images] // ✅ Ensures array
      imgs = imagesArray.map(image => image.filepath)
      uploadedImages = await uploadFiles(imagesArray, 'test')
    }
    console.log(imgs, 'imgs')
    await fs.rm(uploadDir, { recursive: true, force: true }) // ✅ Fix: No callback

    // return res.status(200).json({ uploadedImages })

    await dbConnect()
    await post.create({
      subtitle,
      title,
      englishTitle,
      slug,
      content,
      hashtags: hashtagsArray,
      category,
      subcategory,
      tags,
      newsType,
      metadata: {
        cloudinaryVersion: 'v1.0'
      },
      keywords: keywordsArray,
      images:
        uploadedImages?.length &&
        uploadedImages?.map(image => ({
          url: image.secure_url, // Cloudinary secure URL
          public_id: image.public_id // Cloudinary public ID
        })),
      author: process.env.ADMIN_ID
    })

    console.log('success post create')
    try {
      res.status(200).json({ uploadedImages })
    } catch (error) {
      console.error('Cloudinary upload error:', error?.message)
      res.status(500).json({ error: 'Error uploading to Cloudinary' })
    }
  })
}
