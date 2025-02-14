// models/Post.js
import mongoose from 'mongoose'

const { Schema } = mongoose

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    englishTitle: {
      type: String,
      required: true,
      trim: true
    },
    subtitle: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    content: {
      type: String,
      required: true
    },
    hashtags: {
      type: [String],
      default: []
    },
    category: {
      type: String,
      required: true
    },
    subcategory: {
      type: String, // New field for subcategory
      required: false // Optional, depending on your use case
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true }
      }
    ],
    videos: {
      type: [String],
      default: []
    },
    socialMediaLinks: {
      twitterPost: {
        type: String,
        default: ''
      },
      instagramPost: {
        type: String,
        default: ''
      }
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, // Store ObjectId for user
      ref: 'User', // Reference the User model
      required: true
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    },
    archivedBy: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
      },
      date: {
        type: Date,
        default: null
      }
    },
    reactions: {
      like: {
        type: Number,
        default: 0
      },
      love: {
        type: Number,
        default: 0
      },
      funny: {
        type: Number,
        default: 0
      },
      sad: {
        type: Number,
        default: 0
      },
      angry: {
        type: Number,
        default: 0
      }
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Comment', // Assuming you have a Comment model
      default: []
    },
    similarPosts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Post',
      default: []
    },
    views: {
      type: Number,
      default: 0 // This will track the number of views
    },
    isSponsored: {
      type: Boolean,
      default: false
    },
    keywords: {
      type: [String],
      default: []
    },
    polls: {
      question: {
        type: String,
        default: ''
      },
      options: [
        {
          option: {
            type: String,
            required: true
          },
          votes: {
            type: Number,
            default: 0
          }
        }
      ]
    },
    metadata: {
      type: Object,
      default: {}
    },
    newsType: {
      type: String,
      enum: ['normal', 'top', 'breaking', 'trending', 'story'],
      default: 'normal' // Old posts will be "normal" by default
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt automatically
  }
)

export default mongoose.models.Post || mongoose.model('Post', postSchema)
