import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
// /comments/:recipeId
export const createComment = (user, recipeId, newComment) => {
    console.log('user :', user)
    return axios({
        url: `${apiUrl}/comments/${recipeId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { comment: newComment }
    })
}

// UPDATE
// /comments/:recipeId/:commentId
export const updateComment = (user, recipeId, updatedComment) => {
    return axios({
        url: `${apiUrl}/comments/${recipeId}/${updatedComment._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { comment: updatedComment }
    })
}

// DELETE
// /comments/:recipeId/:commentId
export const deleteComment = (user, recipeId, commentId) => {
    // console.log('this the commentId', commentId)
    return axios({
        url: `${apiUrl}/comments/${recipeId}/${commentId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}