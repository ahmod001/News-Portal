import React, { useEffect, useState, useContext } from 'react';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';
import axios from 'axios';
import { userContext } from '../../Context/UserContext';

const Comments = ({ newsId }) => {
    const { loginState: [isLoggedIn, setIsLoggedIn] } = useContext(userContext);
    const [isCommentProcessing, setIsCommentProcessing] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [userId, setUserId] = useState(null);

    // Get Comments
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/commentList/' + newsId);
                setCommentList(res.data)
            } catch (error) {
                console.error(error);
            }
        })();
    }, [isCommentProcessing])

    // Get User
    useEffect(() => {
        (async () => {
            if (isLoggedIn) {
                try {
                    const res = await axios.get('/userProfile');
                    setUserId(res.data?.id)
                } catch (error) {
                    console.error(error);
                }
            }
        })();
    }, [])

    return (
        <div className="col-lg-8">
            <CommentForm
                newsId={newsId}
                isCommentProcessing={isCommentProcessing}
                setIsCommentProcessing={setIsCommentProcessing} />

            {/* All Comments */}
            <div className='mt-3'>
                {
                    commentList.map((comment, i) => (
                        <CommentCard
                            key={i}
                            userId={userId}
                            comment={comment}
                            isCommentProcessing={isCommentProcessing}
                            setIsCommentProcessing={setIsCommentProcessing} />
                    ))
                }
            </div>
        </div>
    );
};

export default Comments;