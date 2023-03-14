// this modal is rendered by ShowRecipe
// The state that controls whether this is open or not live in ShowRecipe
// the state and the updaterfunction associated with that state is passed here as a prop.
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import RecipeForm from '../shared/RecipeForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditRecipeModal = (props) => {
    // destructure our props
    const { user, show, handleClose, updateRecipe, msgAlert, triggerRefresh } = props

    const [recipe, setRecipe] = useState(props.recipe)

    const onChange = (e) => {
        e.persist()
        
        setRecipe(prevRecipe => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

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

        updateRecipe(user, recipe)
            // first we'll handle closing the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateRecipeSuccess,
                    variant: 'success'
                })
            })
            // if everything goes according to plan, we need a refresh of the show page.
            // we'll build a function in the ShowRecipe component that does this for us, and we'll import that here as a prop
            // this triggers a refresh of the parent(ShowRecipe) by changing the value of the updated piece of state which lives in useEffect's dependency array.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.updateRecipeFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <RecipeForm 
                    Recipe={recipe} 
                    handleChange={onChange} 
                    handleSubmit={onSubmit} 
                    heading="Update Recipe"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditRecipeModal