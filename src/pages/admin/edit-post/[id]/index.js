import React, { useState, useEffect } from 'react'
import { Grid, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import axios from 'axios'
import slugify from 'slugify'
import toast from 'react-hot-toast'
import navigation from 'src/configs/navigation'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { newsTypes, subCategories } from 'src/configs/create-post'

const categories = navigation().map(item => ({
  title: item.title,
  value: item.path.split('/')[1]
}))

const EditPost = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    englishTitle: '',
    slug: '',
    subtitle: '',
    keywords: '',
    hashtags: '',
    category: '',
    subcategory: '',
    images: null,
    content: '',
    newsType: 'normal'
  })
  const [loading, setLoading] = useState(false)
  const [postData, setPostData] = useState(null)
  const [availableSubCategories, setAvailableSubCategories] = useState([])

  const postId = router.query.id

  useEffect(() => {
    if (formData.category) {
      console.log('formData.mainCategory: ', formData.category)
      // Convert to slug format
      const formattedCategory = slugify(formData.category, { lower: true })
      const subcategoryList = subCategories[formattedCategory] || []
      setAvailableSubCategories(subcategoryList)
      setFormData(prevState => ({ ...prevState, subcategory: '' }))
    }
  }, [formData.category])

  useEffect(() => {
    if (postId) {
      fetchPostData(postId)
    }
  }, [postId])

  const fetchPostData = async id => {
    setLoading(true)
    try {
      const response = await axios.get(`/api/post/${id}`)
      const post = response.data.data
      setPostData(post)
      console.log('post: ', post)
      console.log(Array.isArray(post.hashtags), post.hashtags)
      console.log(post.hashtags.join(', '), 'hashtags')
      // Populate the formData state
      setFormData({
        title: post.title || '',
        englishTitle: post.englishTitle || '',
        slug: post.slug || '',
        subtitle: post.subtitle || '',
        keywords: Array.isArray(post.keywords) ? post.keywords.join(', ') : '', // Safely handle array conversion
        hashtags: Array.isArray(post.hashtags) ? post.hashtags.join(', ') : '', // Safely handle array conversion
        newsType: post.newsType || 'normal',
        category: post.category || '',
        subcategory: post.subcategory || '',
        content: post.content || '',
        images: null // Images will be handled separately
      })
    } catch (error) {
      console.error('Error fetching post data:', error)
      toast.error('Failed to load post data')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = e => {
    setFormData(prev => ({ ...prev, images: e.target.files }))
  }

  console.log(availableSubCategories, 'availableSubCategories')

  const handleSubmit = async e => {
    e.preventDefault()

    const { title, englishTitle, slug, subtitle, content, images } = formData

    if (images?.length === 0) {
      return toast.error('Please upload at least one image')
    }

    if (!title || !englishTitle || !subtitle || !slug || !content) {
      return toast.error('Please fill in all the required fields')
    }

    // setLoading(true)

    const formDataToSend = new FormData()
    Object.keys(formData).forEach(key => {
      if (key === 'images' && formData.images) {
        Array.from(formData.images).forEach(file => formDataToSend.append('images', file))
      } else if (key === 'keywords' || key === 'hashtags') {
        formDataToSend.append(
          key,
          formData[key].split(',').map(item => item.trim())
        )
      } else {
        formDataToSend.append(key, formData[key])
      }
    })

    console.log('formDataToSend: ', formDataToSend)

    try {
      await axios.put(`/api/admin/post/${postId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success('Post updated successfully')
      //   router.push(`/posts`)
    } catch (error) {
      console.error('Error updating post:', error)
      toast.error('Failed to update the post')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Typography align='center'>Loading post...</Typography>
  }

  if (!postData) {
    return <Typography align='center'>Post not found.</Typography>
  }

  return (
    <Grid container spacing={4} padding={4}>
      <Grid item xs={12}>
        <Typography variant='h4' align='center' gutterBottom>
          Edit Post
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          label='Title'
          multiline
          rows={2}
          variant='outlined'
          name='title'
          value={formData.title}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          required
          label='English Title'
          multiline
          rows={2}
          variant='outlined'
          name='englishTitle'
          value={formData.englishTitle}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          label='URL'
          multiline
          rows={2}
          variant='outlined'
          name='slug'
          value={formData.slug}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          label='Subtitle'
          multiline
          rows={2}
          variant='outlined'
          name='subtitle'
          value={formData.subtitle}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>News Type</InputLabel>

          <Select
            required
            fullWidth
            label='News Type'
            name='newsType'
            value={formData.newsType}
            onChange={handleChange}
          >
            {newsTypes.map(news => (
              <MenuItem key={news.value} value={news.value}>
                {news.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h8' align='left' gutterBottom>
          SEO Fields
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label='Focus Keywords (comma-separated)'
          variant='outlined'
          name='keywords'
          value={formData.keywords}
          onChange={handleChange}
          helperText='Enter focus keywords, separated by commas'
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label='Tags (comma-separated)'
          variant='outlined'
          name='hashtags'
          value={formData.hashtags}
          onChange={handleChange}
          helperText='Enter tags, separated by commas'
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select required name='category' value={formData.category} onChange={handleChange} label='Category'>
            {categories.map(category => (
              <MenuItem key={category.value} value={category.value}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Sub Category</InputLabel>
          <Select
            required
            name='subcategory'
            value={formData.subcategory}
            onChange={handleChange}
            label='Sub Category'
            disabled={!formData.category} // Disable until a main category is selected
          >
            {availableSubCategories.map(subcategory => (
              <MenuItem key={subcategory.value} value={subcategory.value}>
                {subcategory.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* <Grid item xs={12} md={6}>
        <Button variant='contained' component='label' fullWidth color='primary'>
          Upload Image
          <input hidden type='file' accept='image/*' multiple onChange={handleFileChange} />
        </Button>
      </Grid> */}

      <Grid item xs={12}>
        <TextField
          fullWidth
          label='Story'
          multiline
          rows={10}
          variant='outlined'
          name='content'
          value={formData.content}
          onChange={handleChange}
        />
      </Grid>

      <Grid container justifyContent='flex-end' item xs={12} md={3}>
        <Button variant='contained' color='primary' fullWidth onClick={handleSubmit}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </Grid>
    </Grid>
  )
}

export default EditPost
