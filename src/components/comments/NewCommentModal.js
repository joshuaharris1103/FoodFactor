import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CommentForm from '../shared/CommentForm'
import { createComment } from '../../api/comments'
import messages from '../shared/AutoDismissAlert/messages'



const NewCommentModal = (props) => {
    const { recipe, show, handleClose, msgAlert, triggerRefresh, user } = props

    const [comment, setComment] = useState({})

    const onChange = (e) => {
        e.persist()
        
        setComment(prevComment => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
            
            const updatedComment = {
                [updatedName] : updatedValue
            }
            
            console.log('the Comment', updatedComment)
            console.log('the Comment (state)', comment)

            return {
                ...prevComment, ...updatedComment
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createComment(user, recipe._id, comment)
            // first we'll close the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createCommentSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.createCommentFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <CommentForm 
                    comment={comment}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Give ${recipe.name} a comment!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewCommentModal