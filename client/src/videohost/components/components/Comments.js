import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import api from '../../../auth/api/auth'
import CommentItem from './components/CommentItem'
import CommentField from './CommentField'

const Comments = () => {
  const params = useParams()
  const [comments, setComments] = useState([])

  useEffect(() => {
    const getComments = async () => {
      const response = await api.get(`/api/videohost/videos/comments/${params.id}`)
      setComments(response.data.comments)
    }
    getComments()
  }, [params])

  return (
    <div className='videohost-video-comments'>
      <CommentField />
        {
          comments.map(item => <CommentItem item={item} />)
        }
    </div>
  )
}

export default Comments
