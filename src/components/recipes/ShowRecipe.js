import { useState, useEffect } from 'react'
// useParams from react-router-dom allows us to see our route parameters
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneRecipe, removeRecipe, updateRecipe } from '../../api/recipe'
import messages from '../shared/AutoDismissAlert/messages'
// import LoadingScreen from '../shared/LoadingScreen'
// import EditRecipeModal from './EditRecipeModal'
// import ShowIngredient from '../ingredients/ShowIngredient'
// import NewIngredientModal from '../ingredients/NewIngredientModal'

// we need to get the recipe's id from the route parameters
// then we need to make a request to the api
// when we retrieve a recipe from the api, we'll render the data on the screen

const ShowRecipe = (props) => {
    const [recipe, setRecipe] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, msgAlert } = props
    const [ updated, setUpdated ] = useState(false)

    // console.log('msgAlert in ShowRecipe props', msgAlert)

    useEffect(() => {
        getOneRecipe(id)
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
            <div className='post'>
                <Card>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Recipe Name: { recipe.name }</small></div>
                            <div><small>Caption: { recipe.caption }</small></div>
                            <div>
                                <small>
                                    Image: { recipe.image ? 'yes' : 'no' }
                                </small>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            </Container>
        </>
    )
}

export default ShowRecipe