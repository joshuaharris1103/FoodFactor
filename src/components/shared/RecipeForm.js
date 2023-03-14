import { Form, Button, Container } from 'react-bootstrap'
import Uploader from './Uploader'

const recipeForm = (props) => {
    const { recipe, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <div className='card' 
            style= {{margin: '10px auto', 
            maxWidth: '75%', 
            padding: '20px', 
            textAlign:'center'}}>

            
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Recipe Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is your recipe's name?"
                        name="recipe name"
                        id="recipe name"
                        value={ recipe?.recipeName }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Caption:</Form.Label>
                    <Form.Control 
                        placeholder="Add a caption"
                        name="caption"
                        id="caption"
                        value={ recipe?.caption }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Media:</Form.Label>
                    <Form.Control 
                        type="string"
                        placeholder="Will Add Photo Functionality here soon..."
                        name="image"
                        id="image"
                        value={ recipe?.image }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
                </div>
        </Container>
    )
}

export default recipeForm