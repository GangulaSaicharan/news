// models/User.js
import mongoose from 'mongoose'

const { Schema } = mongoose

// Define the User Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['main-admin', 'admin', 'user', 'contributor'],
      required: true,
      default: 'user' // Default role is 'user' during sign up
    },
    status: {
      type: String,
      enum: ['active', 'disabled'],
      default: 'active' // Users can be either active or disabled
    },
    // Main Admin has control over permissions for other users
    // The user can enroll as a contributor after signing up
    enrollmentStatus: {
      type: String,
      enum: ['not-enrolled', 'enrolled'],
      default: 'not-enrolled'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    // To track when the user was created and last updated
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
)

// Pre-save hook to update `updatedAt` on every update
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.models.User || mongoose.model('User', userSchema)
