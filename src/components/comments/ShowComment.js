import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteComment } from '../../api/comments'
import EditCommentModal from './EditCommentModal'
// import Rating from '../shared/Rating'
// import { ShowRating } from '../shared/ShowRating'

const ShowComment = (props) => {
    const { comment, user, recipe, msgAlert, triggerRefresh } = props
    // here's our hook to display the EditCommentModal
    const [editModalShow, setEditModalShow] = useState(false)
    // console.log('this is the Comment in showComment', Comment)
    // here, we're going to use react styling objects to our advantage
    // this will look at the Comment's condition, and change the background color
    // we'll also use this to set a consistent width for each card
    // we'll pass the results of this function to a style prop in our card
    const setBgCondition = (cond) => {
        if (cond === 'new') {
            return({width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'used') {
            return({width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return({width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    const destroyComment = () => {
        // this is the api call file function
        // it requires three args, user, recipeId, & CommentId
        deleteComment(user, recipe._id, comment._id)
            // upon success, we want to send a message
            .then(() => {
                msgAlert({
                    heading: 'Comment Deleted',
                    message: 'Bye Bye Comment!',
                    variant: 'success'
                })
            })
            // then trigger a refresh of the parent component
            .then(() => triggerRefresh())
            // upon failure send an appropriate message
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }
    console.log('Comment User:', comment.owner)
    console.log('user id:', user._id)

    return (
        <>
            <Card className="m-2" style={setBgCondition(comment.condition)}>
                <Card.Header>{comment.name}</Card.Header>
                <Card.Body>
                    {comment.note}
              
                    
                </Card.Body>
                <Card.Footer>
                    {
                        user._id === comment.owner
                        ?
                        <>
                            <Button
                                onClick={() => setEditModalShow(true)}
                                variant="warning"
                                className="m-2"
                            >
                                Edit Comment
                            </Button>
                            <Button 
                                onClick={() => destroyComment()} 
                                variant="danger"
                                className="m-2"
                            >
                                Delete Comment
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditCommentModal
                user={user}
                recipe={recipe}
                comment={comment}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowComment