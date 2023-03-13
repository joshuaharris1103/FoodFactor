import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllRecipes = (user) => {
    console.log('GET ALL RECIPES')
    return axios({
        url: `${apiUrl}/recipes`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

// READ -> Show
export const getOneRecipe = (_id) => {
    return axios(`${apiUrl}/recipes/${_id}`)
}

// Create (create a Recipe)
export const createRecipe = (user, newRecipe) => {
    console.log('this is the user', user)
    console.log('this is the new recipe', newRecipe)
    return axios({
        url: `${apiUrl}/recipes`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { recipe: newRecipe }
    })
}

// Update (update a Recipe)
export const updateRecipe = (user, updatedRecipe) => {
    return axios({
        url: `${apiUrl}/recipes/${updatedRecipe.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { Recipe: updatedRecipe }
    })
}

// Delete (delete a Recipe)
export const removeRecipe = (user, recipeId) => {
    return axios({
        url: `${apiUrl}/recipes/${recipeId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}