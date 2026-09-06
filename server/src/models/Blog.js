import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: '', trim: true },
    content: { type: String, default: '' },
    image: { type: String, default: '' },
    category: { type: String, default: 'Technology', trim: true },
    tags: { type: [String], default: [] },
    author: { type: String, default: 'Samudra Astra', trim: true },
    status: {
      type: String,
      enum: ['draft', 'published', 'scheduled'],
      default: 'draft',
    },
    publishedAt: { type: Date, default: null },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
  },
  { timestamps: true }
)

blogSchema.index({ status: 1, publishedAt: -1 })

export const Blog = mongoose.model('Blog', blogSchema)
