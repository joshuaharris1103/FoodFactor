import { useState, useEffect } from 'react'

// useParams from react-router-dom allows us to see our route parameters
import { useParams } from 'react-router-dom'

import { Container, Card, Button } from 'react-bootstrap'

import { getOneRecipe } from '../../api/recipe'

import messages from '../shared/AutoDismissAlert/messages'

// we need to get the recipe's id from the route parameters
// then we need to make a request to the api
// when we retrieve a recipe from the api, we'll render the data on the screen

const ShowRecipe = (props) => {
    const [recipe, setRecipe] = useState(null)
    const { id } = useParams()
    const { user, msgAlert } = props
    console.log('user in ShowRecipe props', user)
    // console.log('msgAlert in ShowRecipe props', msgAlert)

    useEffect(() => {
        getOneRecipe(id)
            .then(res => setRecipe(res.data.recipe))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting recipes',
                    message: messages.getRecipesFailure,
                    variant: 'danger'
                })
            })
    }, [id])

    if(!recipe) {
        return <p>loading...</p>
    }
    console.log('this is recipe:', recipe)
    
    return (
        <>
            <Container>
                <Card>
                    <Card.Header>{ recipe.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Username: { recipe.username }</small></div>
                            <div><small>Description: { recipe.description }</small></div>
                            <div>
                                <small>
                                    ImageUrl: { recipe.imageUrl ? 'yes' : 'no' }
                                </small>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ShowRecipe