import { IncomingForm } from 'formidable'
import { uploadFiles } from 'src/lib/cloudinary-upload'
import dbConnect from 'src/lib/mongodb'
import post from 'src/models/post'

// Disable Next.js body parser for the API route
export const config = {
  api: {
    bodyParser: false // Important to disable Next.js body parser for file uploads
  }
}

export default async function handler(req, res) {
  console.log('POST method called')
  const form = new IncomingForm()
  form.uploadDir = './'
  form.keepExtensions = true // Retain file extensions like .jpg, .png
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err)
      return res.status(500).json({ error: 'Error processing file upload' })
    }
    const parsedFields = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
    )
    console.log(parsedFields, 'parsedFields')
    const { subtitle, title, newsType, englishTitle, slug, content, hashtags, category, subcategory, tags, keywords } =
      parsedFields

    console.log(title, 'title')
    console.log(category, 'category')
    // Handle hashtags and keywords to convert them to arrays if they are not already
    const hashtagsArray = hashtags ? hashtags.split(',').map(tag => tag.trim()) : []
    console.log('hashtagsArray: ', hashtagsArray)
    const keywordsArray = keywords ? keywords.split(',').map(keyword => keyword.trim()) : []

    // let uploadedImages = []
    // if (files.images) {
    //   uploadedImages = await uploadFiles(files.images, 'test')
    // }

    await dbConnect()

    //   images:
    //     uploadedImages?.length &&
    //     uploadedImages?.map(image => ({
    //       url: image.secure_url, // Cloudinary secure URL
    //       public_id: image.public_id // Cloudinary public ID
    //     })),

    // console.log(newsType, 'newsType')
    console.log(subcategory, 'subcategory')
    const updatedPost = await post.updateOne(
      { _id: req.query.id }, // Filter by postId
      {
        $set: {
          subtitle,
          title,
          englishTitle,
          slug,
          newsType,
          content,
          hashtags: hashtagsArray, // Update hashtags as array
          category,
          subcategory,
          tags,
          keywords: keywordsArray // Update keywords as array
        }
      }
    )

    if (updatedPost.modifiedCount === 0) {
      return res.status(404).json({ error: 'Post not found or no changes made' })
    }

    try {
      res.status(200).json({ success: true, message: 'Post updated successfully' })
    } catch (error) {
      console.error('Cloudinary upload error:', error?.message)
      res.status(500).json({ error: 'Error uploading to Cloudinary' })
    }
  })
}
