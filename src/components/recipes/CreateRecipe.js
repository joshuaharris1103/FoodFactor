import { useState } from 'react'
import { createRecipe } from '../../api/recipe'
import { createRecipeSuccess, createRecipeFailure } from '../shared/AutoDismissAlert/messages'
import RecipeForm from '../shared/RecipeForm'

// bring in the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom'

const CreateRecipe = (props) => {
    // pull out our props
    const { user, msgAlert } = props

    // set up(pull our navigate function from useNavigate)
    const navigate = useNavigate()
    console.log('this is navigate', navigate)

    const [recipe, setRecipe] = useState({
        RecipeName: '',
        Caption: '',
        ImageUrl: '',
        
    })

    const onChange = (e) => {
        e.persist()
        
        setRecipe(prevRecipe => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            console.log('this is the input type', e.target.type)

            // to handle a number, we look at the type, and parse a string to an integer
            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedRecipe = {
                [updatedName] : updatedValue
            }
            
            console.log('the Recipe', updatedRecipe)

            return {
                ...prevRecipe, ...updatedRecipe
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createRecipe(user, recipe)
            // first we'll nav to the show page
            .then(res => { navigate(`/recipes/${res.data.recipes.id}`)})
            console.log(recipe.id)
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
            Recipe={recipe}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Create"
        />
    )
}

export default CreateRecipe