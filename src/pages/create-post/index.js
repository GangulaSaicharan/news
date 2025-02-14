// import React, { useState } from 'react'
// import { Grid, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
// import axios from 'axios'
// import slugify from 'slugify'
// import toast from 'react-hot-toast'
// import navigation from 'src/configs/navigation'
// import { newsTypes } from 'src/configs/create-post'

// const categories = navigation().map(item => ({
//   title: item.title,
//   value: item.path.split('/')[1]
// }))

// const CreatePost = () => {
//   const [state, setState] = useState({
//     title: '',
//     englishTitle: '',
//     slug: '',
//     subtitle: '',
//     mainCategory: '',
//     secondCategory: '',
//     hashtags: '',
//     keywords: '',
//     content: '',
//     images: null,
//     loading: false,
//     newsType: 'normal'
//   })

//   console.log(state.newsType, 'state')

//   const handleChange = e => {
//     const { name, value } = e.target
//     setState(prev => ({ ...prev, [name]: value }))
//   }

//   const handleFileChange = event => {
//     const files = event.target.files
//     if (files.length > 0) {
//       setState(prev => ({ ...prev, images: files })) // Store FileList directly
//     }
//   }

//   console.log(state.images, 'state.images')
//   const handleSubmit = async e => {
//     e.preventDefault()

//     if (!state.images || state.images.length === 0) {
//       return toast.error('Please upload at least one image')
//     }

//     // if (!state.title || !state.englishTitle || !state.subtitle || !state.slug || !state.content) {
//     //   return toast.error('Please fill in all the required fields')
//     // }

//     setState(prev => ({ ...prev, loading: true }))

//     const formData = new FormData()
//     formData.append('title', state.title)
//     formData.append('englishTitle', state.englishTitle)
//     formData.append('subtitle', state.subtitle)
//     formData.append('slug', slugify(state.slug))
//     formData.append('newsType', state.newsType)
//     formData.append('content', state.content)
//     formData.append(
//       'hashtags',
//       state.hashtags
//         .split(',')
//         .map(tag => tag.trim())
//         .join(',')
//     )
//     formData.append(
//       'keywords',
//       state.keywords
//         .split(',')
//         .map(keyword => keyword.trim())
//         .join(',')
//     )
//     formData.append('category', state.mainCategory)
//     formData.append('subcategory', state.secondCategory)
//     if (state.images) {
//       Array.from(state.images).forEach(file => {
//         formData.append('images', file)
//       })
//     }

//     try {
//       const response = await axios.post('/api/createPost', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       })
//       toast.success('Post created successfully')
//       // setState({
//       //   title: '',
//       //   englishTitle: '',
//       //   slug: '',
//       //   subtitle: '',
//       //   mainCategory: '',
//       //   secondCategory: '',
//       //   hashtags: '',
//       //   keywords: '',
//       //   content: '',
//       //   images: null,
//       //   loading: false,
//       //   newsType: 'normal'
//       // })
//     } catch (error) {
//       console.error('Error creating post:', error)
//       toast.error(error.message)
//     } finally {
//       setState(prev => ({ ...prev, loading: false }))
//     }
//   }

//   return (
//     <Grid container spacing={4} padding={4}>
//       <Grid item xs={12}>
//         <Typography variant='h4' align='center' gutterBottom>
//           Create Post
//         </Typography>
//       </Grid>

//       <Grid item xs={12} md={6}>
//         <TextField
//           required
//           fullWidth
//           label='Title'
//           multiline
//           rows={2}
//           variant='outlined'
//           name='title'
//           value={state.title}
//           onChange={handleChange}
//         />
//       </Grid>

//       <Grid item xs={12} md={6}>
//         <TextField
//           required
//           fullWidth
//           label='English Title'
//           multiline
//           rows={2}
//           variant='outlined'
//           name='englishTitle'
//           value={state.englishTitle}
//           onChange={handleChange}
//         />
//       </Grid>

//       <Grid item xs={12} md={6}>
//         <TextField
//           required
//           fullWidth
//           label='URL'
//           multiline
//           rows={2}
//           variant='outlined'
//           name='slug'
//           value={state.slug}
//           onChange={handleChange}
//         />
//       </Grid>

//       <Grid item xs={12} md={6}>
//         <TextField
//           required
//           fullWidth
//           label='Subtitle'
//           multiline
//           rows={2}
//           variant='outlined'
//           name='subtitle'
//           value={state.subtitle}
//           onChange={handleChange}
//         />
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <FormControl fullWidth>
//           <InputLabel>News Type</InputLabel>
//           <Select required fullWidth label='News Type' name='newsType' value={state.newsType} onChange={handleChange}>
//             {newsTypes.map(news => (
//               <MenuItem value={news.value}>{news.label}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Grid>

//       <Grid item xs={12}>
//         <Typography variant='h8' align='left' gutterBottom>
//           SEO Fields
//         </Typography>
//       </Grid>

//       <Grid item xs={12} md={6}>
//         <TextField
//           fullWidth
//           label='Focus Keywords (comma-separated)'
//           variant='outlined'
//           name='keywords'
//           value={state.keywords}
//           onChange={handleChange}
//           helperText='Enter focus keywords, separated by commas'
//         />
//       </Grid>

//       <Grid item xs={12} md={6}>
//         <TextField
//           fullWidth
//           label='Tags (comma-separated)'
//           variant='outlined'
//           name='hashtags'
//           value={state.hashtags}
//           onChange={handleChange}
//           helperText='Enter tags, separated by commas'
//         />
//       </Grid>

//       <Grid item xs={12} md={6}>
//         <FormControl fullWidth>
//           <InputLabel>Main Category</InputLabel>
//           <Select required name='mainCategory' value={state.mainCategory} onChange={handleChange} label='Main Category'>
//             {categories.map(category => (
//               <MenuItem key={category.value} value={category.value}>
//                 {category.title}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Grid>

//       <Grid item xs={12} md={6}>
//         <FormControl fullWidth>
//           <InputLabel>Second Category</InputLabel>
//           <Select
//             required
//             name='secondCategory'
//             value={state.secondCategory}
//             onChange={handleChange}
//             label='Second Category'
//           >
//             {categories.map(category => (
//               <MenuItem key={category.value} value={category.value}>
//                 {category.title}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Grid>
//       {/*
//       <Grid item xs={12} md={6}>
//         <Button variant='contained' component='label' fullWidth color='primary'>
//           Upload Image
//           <input hidden name='images' type='file' accept='image/*' onChange={handleFileChange} />
//         </Button>
//       </Grid> */}
//       <Grid item xs={12} md={6}>
//         <Button variant='contained' component='label' fullWidth color='primary'>
//           Upload Images
//           <input
//             hidden
//             name='images'
//             type='file'
//             accept='image/*'
//             multiple // Allows multiple files to be selected
//             onChange={handleFileChange}
//           />
//         </Button>
//       </Grid>

//       <Grid item xs={12}>
//         <Typography variant='h6'>Story</Typography>
//         <TextField
//           fullWidth
//           required
//           label='Content'
//           multiline
//           rows={7}
//           variant='outlined'
//           name='content'
//           value={state.content}
//           onChange={handleChange}
//         />
//       </Grid>

//       <Grid container justifyContent='flex-end' item xs={12} md={3}>
//         <Button variant='contained' color='primary' fullWidth onClick={handleSubmit}>
//           {state.loading ? 'Submitting...' : 'Submit'}
//         </Button>
//       </Grid>
//     </Grid>
//   )
// }

// export default CreatePost

import React, { useState, useEffect } from 'react'
import { Grid, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import axios from 'axios'
import slugify from 'slugify'
import toast from 'react-hot-toast'
import navigation from 'src/configs/navigation'
import { newsTypes, subCategories } from 'src/configs/create-post'

const categories = navigation().map(item => ({
  title: item.title,
  value: item.path.split('/')[1]
}))

const CreatePost = () => {
  const [state, setState] = useState({
    title: '',
    englishTitle: '',
    slug: '',
    subtitle: '',
    mainCategory: '',
    secondCategory: '',
    hashtags: '',
    keywords: '',
    content: '',
    images: null,
    loading: false,
    newsType: 'normal'
  })

  const [availableSubCategories, setAvailableSubCategories] = useState([])

  // When the main category changes, update the subcategories
  useEffect(() => {
    if (state.mainCategory) {
      // Convert to slug format
      const formattedCategory = slugify(state.mainCategory, { lower: true })
      const subcategoryList = subCategories[formattedCategory] || []
      setAvailableSubCategories(subcategoryList)
      setState(prevState => ({ ...prevState, secondCategory: '' })) // Reset second category when main category changes
    }
  }, [state.mainCategory])

  const handleChange = e => {
    const { name, value } = e.target
    setState(prev => ({ ...prev, [name]: value }))
  }

  // const handleFileChange = event => {
  //   const files = event.target.files
  //   if (files.length > 0) {
  //     setState(prev => ({ ...prev, images: files })) // Store FileList directly
  //   }
  // }

  const handleFileChange = event => {
    const files = event.target.files
    if (files.length > 0) {
      setState(prev => ({
        ...prev,
        images: [...(prev.images || []), ...Array.from(files)] // ✅ Merge previous & new files
      }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!state.images || state.images.length === 0) {
      return toast.error('Please upload at least one image')
    }

    setState(prev => ({ ...prev, loading: true }))

    const formData = new FormData()
    formData.append('title', state.title)
    formData.append('englishTitle', state.englishTitle)
    formData.append('subtitle', state.subtitle)
    formData.append('slug', slugify(state.slug))
    formData.append('newsType', state.newsType)
    formData.append('content', state.content)
    formData.append(
      'hashtags',
      state.hashtags
        .split(',')
        .map(tag => tag.trim())
        .join(',')
    )
    formData.append(
      'keywords',
      state.keywords
        .split(',')
        .map(keyword => keyword.trim())
        .join(',')
    )
    formData.append('category', state.mainCategory)
    formData.append('subcategory', state.secondCategory)
    if (state.images) {
      Array.from(state.images).forEach(file => {
        formData.append('images', file)
      })
    }

    try {
      const response = await axios.post('/api/createPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success('Post created successfully')
    } catch (error) {
      console.error('Error creating post:', error)
      toast.error(error.message)
    } finally {
      setState({
        title: '',
        englishTitle: '',
        slug: '',
        subtitle: '',
        mainCategory: '',
        secondCategory: '',
        hashtags: '',
        keywords: '',
        content: '',
        images: null,
        loading: false,
        newsType: 'normal',
        loading: false
      })
    }
  }

  return (
    <Grid container spacing={4} padding={4}>
      <Grid item xs={12}>
        <Typography variant='h4' align='center' gutterBottom>
          Create Post
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
          value={state.title}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          label='English Title'
          multiline
          rows={2}
          variant='outlined'
          name='englishTitle'
          value={state.englishTitle}
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
          value={state.slug}
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
          value={state.subtitle}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>News Type</InputLabel>
          <Select required fullWidth label='News Type' name='newsType' value={state.newsType} onChange={handleChange}>
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
          value={state.keywords}
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
          value={state.hashtags}
          onChange={handleChange}
          helperText='Enter tags, separated by commas'
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Main Category</InputLabel>
          <Select required name='mainCategory' value={state.mainCategory} onChange={handleChange} label='Main Category'>
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
          <InputLabel>Second Category</InputLabel>
          <Select
            required
            name='secondCategory'
            value={state.secondCategory}
            onChange={handleChange}
            label='Second Category'
            disabled={!state.mainCategory} // Disable until a main category is selected
          >
            {availableSubCategories.map(subcategory => (
              <MenuItem key={subcategory.value} value={subcategory.value}>
                {subcategory.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <Button variant='contained' component='label' fullWidth color='primary'>
          Upload Images
          <input hidden name='images' type='file' accept='image/*' multiple onChange={handleFileChange} />
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h6'>Story</Typography>
        <TextField
          fullWidth
          required
          label='Content'
          multiline
          rows={7}
          variant='outlined'
          name='content'
          value={state.content}
          onChange={handleChange}
        />
      </Grid>

      <Grid container justifyContent='flex-end' item xs={12} md={3}>
        <Button variant='contained' color='primary' fullWidth onClick={handleSubmit}>
          {state.loading ? 'Submitting...' : 'Submit'}
        </Button>
      </Grid>
    </Grid>
  )
}

export default CreatePost
