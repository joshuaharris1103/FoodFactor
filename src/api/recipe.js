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
export const getOneRecipe = (id) => {
    return axios(`${apiUrl}/recipes/${id}`)
}

// Create (create a Recipe)
export const createRecipe = (user, newRecipe) => {
    console.log('this is the user', user)
    console.log('this is the newPet', newRecipe)
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
        url: `${apiUrl}/recipes/${updatedRecipe._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { Recipe: updatedRecipe }
    })
}