import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'

// api function from our api file
import { getAllRecipes } from '../../api/recipe'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'

// this is a styling object. they're a quick easy way add focused css properties to our react components
const cardContainerStyle = {
    margin: '10px',
    border: '10px',
    width: '80%',
    maxWidth: '100%',
    padding: '20px',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}
{/* <div className='card' 
            style= {{margin: '10px auto', 
            maxWidth: '75%', 
            padding: '20px', 
            textAlign:'center'}}> */}

// RecipeIndex will make a request to the API for all Recipe
// once it receives a response, display a card for each recipes
const RecipeIndex = (props) => {
    const [recipes, setRecipes] = useState(null)
    const [error, setError] = useState(false)
    console.log('these are the recipes in index', recipes)

    // pull the message alert (msgAlert) from props
    const { user, msgAlert, caption, image, recipeName } = props

    console.log('this is your user auth token', user.token)
    // get our Recipe from the api when the component mounts
    useEffect(() => {
        getAllRecipes(user)
            .then(res => setRecipes(res.data.recipes))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting recipes',
                    message: messages.getRecipeFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])
    
    // if error, display an error
    if (error) {
        return <p>Error!</p>
    }


    if (!recipes) {
        // if no Recipe loaded yet, display 'loading'
        return <p>...loading ...please wait</p>
    } else if (recipes.length === 0) {
        // otherwise if there ARE no Recipe, display that message
        return <p>No recipes yet, go add some!</p>
    }

    // once we have an array of Recipe, loop over them
    // produce one card for every recipes
    
    const recipeCards = recipes.map(recipe => (
        // <Card key={ recipes.id } style={{ width: '30%', margin: 5 }}>
        //     <Card.Header>{ recipes.fullTitle }</Card.Header>
        //     <Card.Body>
        //         <Card.Text>
        //             <Link to={`/recipes/${recipes.id}`} className="btn btn-info">View { recipes.owner }</Link>
        //         </Card.Text>
        //     </Card.Body>
        // </Card>
        
        <div className='post'>
        {/* header -> profile pic & username */}
        <div className="post_header">
            <Avatar
                className='post_avatar'
                alt='UserPhoto'
                // this is where users will have uploaded profile pictures
                src=''
                />
            <h3>{ recipe._id }</h3>
            {/* <h3>{ user.username }</h3> this display's logged in user's @ */}
            {/* this should be the user's @ */}
        </div>
        
        {/* image */}
        <Link to={`/recipes/${recipe._id}`}>
            <img className='post_image' src={ recipe.image }/>
        </Link>
        <Link to={`/recipes/${recipe._id}`} className="btn btn-info">
            View Recipe { recipe.recipeName }
        </Link>
        {/* username & caption */}
        <h4 className='post_text'><strong>
            <Link to={`/recipes/${recipe._id}`} style={{textDecoration:"none", color: 'grey'}}>
                { recipe._id }:
            </Link>{/*username*/}</strong> { recipe.caption }</h4>

        {/* Like Post */}
        {/* <h6>{recipes.likes.length}</h6> */}
        <h6>{recipe.recipeName}</h6>
        <i className="material-icons" style={{color: 'grey'}}>thumb_up</i>
        <i className="material-icons" style={{color: 'grey'}}>thumb_down</i>
        <br/>
        <br/>
        <h6>Add to Meal Plan<i className="material-icons" style={{color: 'red'}}>favorite</i></h6>
        

        {/* Comments */}
        <input type='text' placeholder='add a comment'/>



    </div>
    ))
    console.log('owner is',recipes.owner)
    console.log('caption is',recipes.caption)
    console.log('name is',recipes.name)
    console.log('id is',recipes.id)
    console.log('_id is',recipes._id)
    console.log('this is usernameID', recipes._id) 
    // the id shows in line 102 but not 121?////////////////////////////
    // return some jsx, a container with all the recipecards
    return (
        <div className="container-md" style={ cardContainerStyle }>
            { recipeCards }
        </div>
    )
}

// export our component
export default RecipeIndex