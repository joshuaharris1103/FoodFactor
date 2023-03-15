import { useState } from 'react'
import { createRecipe } from '../../api/recipe'
import { createRecipeSuccess, createRecipeFailure } from '../shared/AutoDismissAlert/messages'
import RecipeForm from '../shared/RecipeForm'

// bring in the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom'

const CreateRecipe = (props) => {
    const { user, msgAlert } = props

    // set up(pull our navigate function from useNavigate)
    const navigate = useNavigate()
    console.log('this is navigate', navigate)

    const [recipe, setRecipe] = useState({
        recipeName: '',
        caption: '',
        image: '',
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
            .then(res => { navigate(`/recipes/${res.data.recipe._id}`)
            console.log('the new created id', recipe.id)}) 
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