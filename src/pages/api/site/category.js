import dbConnect from 'src/lib/mongodb'
import post from 'src/models/post'

export default async function handler(req, res) {
  try {
    // Query only the required fields (title, slug, first image)
    const [topNews, breakingNews, trendingNews, stories] = await Promise.all([
      post
        .find({ newsType: 'top', status: 'published' })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title slug images newsType category'), // Select only title, slug, and images
      post
        .find({ newsType: 'breaking', status: 'published' })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title slug images newsType category'),
      post
        .find({ newsType: 'trending', status: 'published' })
        .sort({ views: -1 })
        .limit(5)
        .select('title slug images newsType category'),
      post
        .find({ newsType: 'story', status: 'published' })
        .sort({ createdAt: -1 })
        .limit(10)
        .select('title slug images newsType category')
    ])

    // Map through the posts to get the first image URL
    const formatPosts = posts => {
      return posts.map(post => ({
        title: post.title,
        slug: `${post.category}/${post.slug}`,
        imageUrl: post.images.length > 0 ? post.images[0].url : '' // Get the first image URL or empty string
      }))
    }

    res.status(200).json({
      topNews: formatPosts(topNews),
      breakingNews: formatPosts(breakingNews),
      trendingNews: formatPosts(trendingNews),
      stories: stories
    })
  } catch (error) {
    res.status(500).json({ error: 'Error fetching news' })
  }
}
