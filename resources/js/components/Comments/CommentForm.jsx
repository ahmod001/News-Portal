import React, { useState, useRef } from 'react';
import axios from 'axios';
import { errorToast } from '../../utils/utils';

const CommentForm = ({ newsId, isCommentProcessing, setIsCommentProcessing }) => {
    const commentRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const comment = commentRef.current.value;

        if (comment.trim() !== '') {
            setIsLoading(true)
            try {
                const res = await axios.post('/createUpdateComment', { news_id: newsId, description: comment })
                e.target.reset();
                setIsCommentProcessing(!isCommentProcessing)
                setIsLoading(false);
                
            } catch (error) {
                errorToast('Something went wrong')
                setIsLoading(false)
            }
        }
    }

    return (
        <form onSubmit={() => handleCommentSubmit(event)} className="form-contact contact_form mb-80">
            <div className="row">
                <div className="col-12">
                    <div>
                        <textarea ref={commentRef} className="form-control w-100 error" rows="8" placeholder="Share Your Thoughts" />
                    </div>
                </div>

            </div>
            <div className="form-group mt-4">
                <button disabled={isLoading} type="submit" className="button button-contactForm boxed-btn">Send</button>
            </div>
        </form>
    );
};

export default CommentForm;