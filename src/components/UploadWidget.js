import { useEffect, useState, useRef } from "react"
import { Button } from "react-bootstrap"
import { createRecipe } from "../api/recipe"
import messages from './shared/AutoDismissAlert/messages'



const UploadWidget = (props) => {
    const {user, msgAlert, recipe} = props
    const [pictureURL, setPictureURL] = useState(null)
    const [state, setState] = useState(false)
    const [uploadPicture, setUploadPicture] = useState(null)

    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    useEffect (() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'djnnpzwtn',
            uploadPreset: 'qnugql8k'
        }, (error,result) => { 


            if (result.event === 'success') {
            setPictureURL(result.info.secure_url)
            console.log('this is pictureURL in if loop',pictureURL)
            setState(true)
        } 
        })
    })
        
        useEffect(()=> {
            if (state === true) { 
                recipe.image.push(pictureURL)
                console.log('this is post after recipe.picture.push', recipe)
                setState(false)
                setUploadPicture(
                    createRecipe(user, recipe)
                        .catch(() => {
                            msgAlert({
                                heading: 'Oh No!',
                                message: messages.updateRecipeFailure,
                                variant: 'danger'
                            })
                    })
                )
            }
            
        })

    return (
        <>
        <Button onClick={() => {widgetRef.current.open()}}>
            Upload
        </Button>
        </>
    )
}

export default UploadWidget