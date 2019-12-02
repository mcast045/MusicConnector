import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../Redux/Actions/Post';
import Spinner from '../Layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = () => {

    const dispatch = useDispatch();
    const posts = useSelector(state => state.post.posts)
    const loading = useSelector(state => state.post.loading)

    useEffect(() => {
        dispatch(getPosts());
    }, [getPosts])

    return (
        <Fragment>
            {loading ? <Spinner /> : (
                <Fragment>
                    <h1 className='large text-primary'>Posts</h1>
                    <p className='lead'><i className='fas fa-user' /> Welcome to the community</p>
                    <PostForm />
                    <div className='posts'>
                        {posts.map(post => (
                            <PostItem key={post._id} post={post} />
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Posts;