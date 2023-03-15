import { useState, useEffect } from 'react'
// useParams from react-router-dom allows us to see our route parameters
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneRecipe, removeRecipe, updateRecipe } from '../../api/recipe'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditRecipeModal from './EditRecipeModal'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ShowComment from '../comments/ShowComment'
import NewCommentModal from '../comments/NewCommentModal'

// we need to get the recipe's id from the route parameters
// then we need to make a request to the api
// when we retrieve a recipe from the api, we'll render the data on the screen

const cardContainerStyle = {
    margin: '10px',
    border: '10px',
    width: '80%',
    maxWidth: '100%',
    padding: '20px',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const commentCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowRecipe = (props) => {
    const [recipe, setRecipe] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [commentModalShow, setCommentModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props
    console.log('user in ShowRecipe props', user)
    console.log('msgAlert in ShowRecipe props', msgAlert)

    useEffect(() => {
        getOneRecipe(user, id)
            .then(res => setRecipe(res.data.recipe))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting Recipes',
                    message: messages.getRecipesFailure,
                    variant: 'danger'
                })
            })
    }, [updated])
    console.log('recipe:',recipe)

// here's where our deleteRecipe function will be called
const deleteRecipe = () => {
    removeRecipe(user, recipe._id)
        // upon success, send the appropriate message and redirect users
        .then(() => {
            msgAlert({
                heading: 'Success',
                message: messages.removeRecipeSuccess,
                variant: 'success'
            })
        })
        .then(() => {navigate('/')})
        // upon failure, just send a message, no navigation required
        .catch(err => {
            msgAlert({
                heading: 'Error',
                message: messages.removeRecipeFailure,
                variant: 'danger'
            })
        })
}

    let commentCards
    if (recipe) {
        if (recipe.comments > 0) {
            commentCards = recipe.comments.map(comment => (
                <ShowComment
                    key={comment.id} 
                    comment={comment}
                    user={user}
                    recipe={recipe}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if(!recipe) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="m-2" >
                <div className='post' >
        {/* header -> profile pic & username */}
        <div className="post_header">
            <Avatar
                className='post_avatar'
                alt='UserPhoto'
                // this is where users will have uploaded profile pictures
                src=''
                />
            { recipe.owner ? <h3>{ user.username }</h3> : null }
            {/* <h3>{ user.username }</h3> this display's logged in user's @ */}
            {/* this should be the user's @ */}
        </div>
        
        {/* image */}
        <Link to={`/recipes/${recipe._id}`}>
            <img className='post_image' src={ recipe.image }/>
        </Link>
        {/* username & caption */}
        <h4 className='post_text'><strong>
            <Link to={`/recipes/${recipe._id}`} style={{textDecoration:"none", color: 'grey'}}>
                { user.username }:
            </Link>{/*username*/}</strong> { recipe.caption }</h4>

        {/* Like Post */}
        {/* <h6>{recipes.likes.length}</h6> */}
        <h6>{recipe.recipeName}</h6>
        <i className="material-icons" style={{color: 'grey'}}>thumb_up</i>
        <i className="material-icons" style={{color: 'grey'}}>thumb_down</i>
        <h6>{recipe.likes.length} Likes</h6>
        <br/>
        <br/>
        <h6>Add to Meal Plan<i className="material-icons" style={{color: 'red'}}>favorite</i></h6>
        

        {/* Comments */}
        <input type='text' placeholder='add a comment'/>
    </div>
                {
                    recipe.owner && user && recipe.owner._id === user._id
                    ?
                    <>
                        <Button 
                            className="m-2" variant="warning"
                            onClick={() => setEditModalShow(true)}
                        >
                            Edit {recipe.recipeName}
                        </Button>
                        <Button 
                            className="m-2" variant="danger"
                            onClick={() => deleteRecipe()}
                        >
                            Remove {recipe.recipeName}
                        </Button>
                    </>
                    :
                    null
                }
            </Container>
            {/* <Container className="m-2" style={commentCardContainerLayout}>
                {commentCards}
            </Container> */}
            <EditRecipeModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateRecipe={updateRecipe}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                recipe={recipe}
            />
            <NewCommentModal 
                recipe={recipe}
                show={commentModalShow}
                handleClose={() => setCommentModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default ShowRecipe