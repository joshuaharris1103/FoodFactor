import { useState, useEffect } from 'react'
// useParams from react-router-dom allows us to see our route parameters
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneRecipe, removeRecipe, updateRecipe } from '../../api/recipe'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditRecipeModal from './EditRecipeModal'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
// import ShowIngredient from '../ingredients/ShowIngredient'
// import NewIngredientModal from '../ingredients/NewIngredientModal'

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

const ShowRecipe = (props) => {
    const [recipe, setRecipe] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, msgAlert } = props
    const [ updated, setUpdated ] = useState(false)

    // console.log('msgAlert in ShowRecipe props', msgAlert)

    useEffect(() => {
        getOneRecipe(user, id)
        .then(res => setRecipe(res.data.recipe))
        .catch(err => {
            msgAlert({
                heading: 'Error getting recipes',
                message: messages.getRecipeFailure,
                variant: 'danger'
            })
        })
    }, [updated])
    
    // here's where our deleteRecipe function will be called
    const deleteRecipe = () => {
        removeRecipe(user, recipe.id)
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

    if(!recipe) {
        return <p>loading...</p>
    }
    console.log('this is recipe:', recipe)
    
    return (
        <>
            <Container>
            <div className='post' >
        {/* header -> profile pic & username */}
        <div className="post_header" >
            <Avatar
                className='post_avatar'
                alt='UserPhoto'
                // this is where users will have uploaded profile pictures
                src=''
                />
            <h3>{ recipe._id }</h3>
            {/* <h3>{ user.username }</h3> this display's logged in user's @ */}
            {/* this should be the user's @ */}
        </div>
        
        {/* image */}
        <img className='post_image' src={ recipe.image }/>

        {/* username & caption */}
        <h4 className='post_text'><strong><a href='/recipes/${recipes.id}' style={{textDecoration:"none", color: 'grey'}}> { recipe._id }:</a>{/*username*/}</strong> { recipe.caption }</h4>

        {/* Like Post */}
        {/* <h6>{recipes.likes.length}</h6> */}
        <h6>{recipe.recipeName}</h6>
        <i className="material-icons" style={{color: 'grey', padding: '5px'}}>thumb_up</i>
        <i className="material-icons" style={{color: 'grey', padding: '5px'}}>thumb_down</i>
        <br/>
        <br/>
        <h6>Add to Meal Plan<i className="material-icons" style={{color: 'red'}}>favorite</i></h6>
        

        {/* Comments */}
        <input type='text' placeholder='add a comment'/>
        <br/>
        {/* Edit and Delete */}
        <Button 
            className="m-2" variant="warning"
            onClick={() => setEditModalShow(true)}
        >
            Edit Post
        </Button>
        <Button 
            className="m-2" variant="danger"
            onClick={() => deleteRecipe()}
        >
            Remove This Post
        </Button>


    </div>
            </Container>
            {/* <Container className="m-2" style={recipeCardContainerLayout}>
                { ingredientCards }
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
            {/* <NewIngredientModal 
                recipe={recipe}
                show={ingredientModalShow}
                handleClose={() => setIngredientModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            /> */}
        </>
    )
}

export default ShowRecipe