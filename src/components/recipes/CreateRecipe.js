// Createrecipe needs to render a form
// that form should build a recipe object in state
// the form should make an axios post request when submitted
// we should send an alert upon success or failure
// on success: component should redirect our user to the new recipe show page
// on failure: component should send the message and remain visible
import { useState } from 'react'
import { createRecipe } from '../../api/recipe'
import { createRecipeSuccess, createRecipeFailure } from '../shared/AutoDismissAlert/messages'
import RecipeForm from '../shared/RecipeForm'
import UploadWidget from '../UploadWidget'

// bring in the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom'

const CreateRecipe = (props) => {
    // pull out our props
    const { user, msgAlert } = props

    // set up(pull our navigate function from useNavigate)
    const navigate = useNavigate()
    console.log('this is navigate', navigate)

    const [recipe, setRecipe] = useState({
        recipeName: '',
        caption: '',
        image: ''
    })

    const onChange = (e) => {
        e.persist()
        
        setRecipe(prevRecipe => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            console.log('this is the input type', e.target.type)
            
            const updatedRecipe = {
                [updatedName] : updatedValue
            }
            
            console.log('the recipe', updatedRecipe)

            return {
                ...prevRecipe, ...updatedRecipe
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createRecipe(user, recipe)
            // first we'll nav to the show page
            .then(res => { navigate(`/recipes/${res.data.recipe._id}`)})
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createRecipeSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: createRecipeFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <RecipeForm 
            recipe={recipe}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new recipe!"
        />
    )
}

export default CreateRecipe