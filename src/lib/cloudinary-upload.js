import cloudinary from 'cloudinary'

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// const uploadFiles = async (files, folder) => {
//   try {
//     console.log('Uploading files to Cloudinary')
//     // Upload each file to Cloudinary
//     const uploadPromises = files?.map(
//       file =>
//         new Promise((resolve, reject) => {
//           cloudinary.v2.uploader
//             .upload(file.filepath, {
//               resource_type: 'auto', // Automatically detect the file type (image, video, etc.)
//               folder: `${folder}/` // Specify folder in Cloudinary (optional)
//             })
//             .then(uploadResponse => {
//               resolve(uploadResponse) // Resolve the promise with the upload response
//             })
//             .catch(error => {
//               reject(error) // Reject the promise with the error
//             })
//         })
//     )

//     return await Promise.all(uploadPromises)
//   } catch (error) {
//     console.error('Error uploading to Cloudinary:', error)
//   }
// }

const uploadFiles = async (files, folder = 'uploads') => {
  try {
    if (!Array.isArray(files)) files = [files] // ✅ Ensure array
    const uploads = files.map(file => {
      return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file.filepath, { folder }, (error, result) => {
          if (error) reject(error)
          else resolve(result)
        })
      })
    })

    return await Promise.all(uploads)
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw new Error('Error uploading to Cloudinary')
  }
}

const deleteFiles = async files => {
  try {
    console.log('deleting files to Cloudinary')
    // Upload each file to Cloudinary
    const uploadPromises = files?.map(
      file =>
        new Promise((resolve, reject) => {
          cloudinary.v2.uploader
            .destroy(file?.public_id)
            .then(uploadResponse => {
              resolve(uploadResponse) // Resolve the promise with the upload response
            })
            .catch(error => {
              reject(error) // Reject the promise with the error
            })
        })
    )

    await Promise.all(uploadPromises)
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
  }
  // try {
  //   const result = await cloudinary.uploader.destroy(publicId)
  //   console.log('Delete result:', result)
  // } catch (error) {
  //   console.error('Error deleting image:', error)
  // }
}

export { deleteFiles, uploadFiles }
