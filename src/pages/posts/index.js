'use client'

import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
  Modal,
  Box,
  Button,
  Typography
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon, Archive as ArchiveIcon, RingVolume } from '@mui/icons-material'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const PostsTable = () => {
  const [posts, setPosts] = useState([]) // Store posts data
  const [openModal, setOpenModal] = useState(false) // Modal state for confirmation
  const [selectedPost, setSelectedPost] = useState(null) // Store post to be archived
  const [loading, setLoading] = useState(true)

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts')
        setPosts(response?.data?.data || []) // Assuming the response contains posts array
      } catch (error) {
        console.error('Error fetching posts:', error)
        toast.error('Failed to load posts')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Handle post deletion
  const handleArchive = async id => {
    try {
      await axios.patch(`/api/post/status/${id}`, { status: 'archived' })
      setPosts(posts.map(post => (post._id === id ? { ...post, status: 'archived' } : post)))
      toast.success('Post archived successfully')
    } catch (error) {
      console.error('Error archiving post:', error)
      toast.error('Error archiving post')
    }
  }

  // Handle archiving confirmation
  const handleDelete = post => {
    setSelectedPost(post)
    setOpenModal(true)
  }

  // Confirm archiving the post
  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/post/delete/${selectedPost._id}`)
      setPosts(posts.filter(post => post._id !== selectedPost._id))
      toast.success('Post deleted successfully')
    } catch (error) {
      console.error('Error deleted post:', error)
      toast.error('Error deleting post')
    } finally {
      setOpenModal(false)
    }
  }

  // Handle toggling the post status (Draft/Published)
  const handleStatusToggle = async post => {
    const newStatus = post.status === 'draft' ? 'published' : 'draft'
    try {
      await axios.patch(`/api/post/status/${post._id}`, { status: newStatus })
      setPosts(posts.map(p => (p._id === post._id ? { ...p, status: newStatus } : p)))
      toast.success(`Post status changed to ${newStatus}`)
    } catch (error) {
      console.error('Error toggling status:', error)
      toast.error('Error toggling post status')
    }
  }

  const handleNotification = async id => {
    try {
      await axios.get(`/api/admin/post/notification/${id}`, { status: 'published' })
      toast.success('Notification sent successfully')
    } catch (error) {
      console.error('Error publishing post:', error)
      toast.error('Error publishing post')
    }
  }
  return (
    <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label='posts table'>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>English Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Subcategory</TableCell>
              <TableCell>Publish</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align='center'>
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              posts?.map(post => (
                <TableRow hover key={post._id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.englishTitle}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.subcategory}</TableCell>
                  <TableCell>
                    <Switch
                      checked={post.status === 'published'}
                      onChange={() => handleStatusToggle(post)}
                      name='status'
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(post)}>
                      <DeleteIcon color='error' />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleNotification(post._id)
                      }}
                    >
                      <RingVolume color='primary' />
                    </IconButton>
                    <IconButton onClick={() => handleArchive(post._id)}>
                      <ArchiveIcon color='primary' />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        window.location.href = `/admin/edit-post/${post._id}`
                      }}
                    >
                      <EditIcon color='primary' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Archive Confirmation Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography>Are you sure you want to archive this post?</Typography>
          <Button variant='contained' color='secondary' onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' onClick={confirmDelete}>
            Confirm
          </Button>
        </Box>
      </Modal>
    </Paper>
  )
}

export default PostsTable
