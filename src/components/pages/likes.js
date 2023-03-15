// import React, { useEffect } from 'react'
// import RecipeIndex from '../recipes/RecipeIndex';

// const likes = () => {
//     const likePost = (id) => {
//         fetch('/like', {
//                 method: "put",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": "Bearer " + localStorage.getrecipe("jwt")
//                 },
//                 body: JSON.stringify({
//                     postId: id
//                 })
//             }).then(res => res.json())
//             .then(result => {
//                 //   console.log(result)
//                 const newData = data.map(recipe => {
//                     if (recipe._id == result._id) {
//                         return result
//                     } else {
//                         return recipe
//                     }
//                 })
//                 setData(newData)
//             }).catch(err => {
//                 console.log(err)
//             })
//     }
//     const unlikePost = (id) => {
//         fetch('/unlike', {
//                 method: "put",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": "Bearer " + localStorage.getrecipe("jwt")
//                 },
//                 body: JSON.stringify({
//                     postId: id
//                 })
//             }).then(res => res.json())
//             .then(result => {
//                 //   console.log(result)
//                 const newData = data.map(recipe => {
//                     if (recipe._id == result._id) {
//                         return result
//                     } else {
//                         return recipe
//                     }
//                 })
//                 setData(newData)
//             }).catch(err => {
//                 console.log(err)
//             })
//     }
// }

// export default likes