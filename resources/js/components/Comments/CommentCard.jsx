import React, { useState, useRef } from 'react';
import { calculateTimeDifference, errorToast, successToast } from '../../utils/utils';
import axios from 'axios';

const CommentCard = ({ comment, userId, isCommentProcessing, setIsCommentProcessing }) => {
    const { id, news_id, user, description, created_at } = comment;
    const buttonStyle = { borderRadius: '3px', 'border': 0 };
    const [isEditMode, setIsEditMode] = useState(false);
    const updateRef = useRef();

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedComment = updateRef.current.value
        setIsEditMode(false);

        if (updatedComment !== description && updatedComment !== '') {
            try {
                const res = await axios.post('/createUpdateComment', {
                    "id": id,
                    "news_id": news_id,
                    "description": updatedComment
                });
                setIsCommentProcessing(!isCommentProcessing)
                successToast('Updated successfully');

            } catch (error) {
                errorToast('Something went wrong')
            }
        }
    }

    const handleDelete = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this comment?");

        if (isConfirmed) {
            try {
                // Perform the deletion if confirmed
                const res = await axios.post('/deleteComment', {
                    "id": id,
                    "news_id": news_id,
                });

                setIsCommentProcessing(!isCommentProcessing);
                successToast(res.data?.message);
            } catch (error) {
                errorToast(error.response?.data?.message);
            }
        }
    };


    return (
        <div class="card card-white post mb-4">
            <div class="post-heading">

                {/* User Img */}
                <div class="float-left image">
                    <img src="/assets/img/user.jpg" class="img-circle avatar" alt={name} />
                </div>

                <div class="float-left meta">
                    {/* User Name */}
                    <div class="title h5">
                        <b>{user?.name}</b>
                    </div>
                    {/* Comment created at */}
                    <h6 class="text-muted time">{calculateTimeDifference(created_at)}</h6>
                </div>

                {user?.id === userId &&
                    (<div className='d-flex justify-content-end'>
                        {/*Edit */}
                        {!isEditMode &&
                            (<button onClick={() => setIsEditMode(true)} style={{ ...buttonStyle, marginRight: '0.6rem' }} className='btn-secondary btn-sm'>
                                Edit
                            </button>)}

                        {/* Delete */}
                        <button onClick={handleDelete} style={buttonStyle} className='btn-danger btn-sm'>
                            Delete
                        </button>
                    </div>)}
            </div>

            {/* Description */}
            {!isEditMode ?
                (<div class="post-description">
                    <p>{description}</p>
                </div>)

                //  Edit Comment 
                : (<form class="post-description" style={{ textAlign: 'end' }} onSubmit={() => handleUpdate(event)}>
                    <textarea className='w-100 p-2' ref={updateRef} type="text" defaultValue={description} />
                    <button style={{ ...buttonStyle, marginTop: "0.15rem" }} className='btn-secondary'>
                        Done
                    </button>
                </form>)}
        </div>
    );
};

export default CommentCard;