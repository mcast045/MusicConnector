import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../Redux/Actions/Post';

const CommentItem = ({ postId, comment: { _id, text, name, avatar, user, date } }) => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img
                        className="round-img"
                        src={avatar}
                        alt=""
                    />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                </p>
                {!auth.loading && user === auth.user._id && (
                    <button onClick={() => dispatch(deleteComment(postId, _id))} typ='button' className='btn btn-danger'>
                        <i className='fas fa-times' />
                    </button>
                )}
            </div>
        </div>

    );
}

export default CommentItem;