import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllRecipes = () => {
    return axios(`${apiUrl}/recipes`)
}

// READ -> Show
export const getOneRecipe = (id) => {
    return axios(`${apiUrl}/recipes/${id}`)
}

// // Create (create a Recipe)
// export const createRecipe = (user, newRecipe) => {
//     return axios({
//         url: `${apiUrl}/recipes`,
//         method: 'POST',
//         headers: {
//             Authorization: `Token token=${user.token}`
//         },
//         data: { recipe: newRecipe }
//     })
// }

// // Update (update a Recipe)
// export const updateRecipe = (user, updatedRecipe) => {
//     return axios({
//         url: `${apiUrl}/recipes/${updatedRecipe._id}`,
//         method: 'PATCH',
//         headers: {
//             Authorization: `Token token=${user.token}`
//         },
//         data: { Recipe: updatedRecipe }
//     })
// }