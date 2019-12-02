import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Layout/Spinner';
import { getPost } from '../../Redux/Actions/Post';
import PostItem from '../Posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = props => {

    const dispatch = useDispatch()
    const post = useSelector(state => state.post.post)
    const loading = useSelector(state => state.post.loading)

    useEffect(() => {
        dispatch(getPost(props.match.params.id))
    }, [getPost])


    return loading || post === null ? <Spinner /> :
        <Fragment>
            <Link to='/posts' className='btn'>
                Back To Post
            </Link>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className='comments'>
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </div>
        </Fragment>
}

export default Post;