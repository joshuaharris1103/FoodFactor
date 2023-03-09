import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

// api function from our api file
import { getAllRecipes } from '../../api/recipe'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'

// this is a styling object. they're a quick easy way add focused css properties to our react components
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

// RecipeIndex will make a request to the API for all Recipe
// once it receives a response, display a card for each recipe
const RecipeIndex = (props) => {
    const [recipe, setRecipe] = useState(null)
    const [error, setError] = useState(false)
    console.log('these are the recipes in index', recipe)

    // pull the message alert (msgAlert) from props
    const { msgAlert } = props

    // get our Recipe from the api when the component mounts
    useEffect(() => {
        getAllRecipes()
            .then(res => setRecipe(res.data.recipe))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting recipes',
                    message: messages.getRecipeFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    console.log("here are your recipes", recipe)

    // if error, display an error
    if (error) {
        return <p>Error!</p>
    }

    if (!recipe) {
        // if no Recipe loaded yet, display 'loading'
        return <p>...loading ...please wait</p>
    } else if (recipe.length === 0) {
        // otherwise if there ARE no Recipe, display that message
        return <p>No recipes yet, go add some!</p>
    }

    // once we have an array of Recipe, loop over them
    // produce one card for every recipe
    const recipeCards = recipe.map(recipe => (
        <Card key={ recipe.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ recipe.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/recipes/${recipe.id}`} className="btn btn-info">View { recipe.username }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    // return some jsx, a container with all the recipecards
    return (
        <div className="container-md" style={ cardContainerStyle }>
            { recipeCards }
        </div>
    )
}

// export our component
export default RecipeIndex