import dbConnect from 'src/lib/mongodb'
import user from 'src/models/user'

export default async function POST(req, res) {
  await dbConnect()
  try {
    const { name, email, password, role } = req.body
    const createAdmin = await user.create({ name, email, password, role })

    if (createAdmin) {
      return res.status(200).json({
        success: true,
        message: 'Admin created successfully',
        data: createAdmin
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating admin',
      error: error.message
    })
  }
}
