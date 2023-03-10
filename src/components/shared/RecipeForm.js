import { Form, Button, Container } from 'react-bootstrap'

const recipeForm = (props) => {
    const { recipe, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Recipe Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is your recipe's name?"
                        name="username"
                        id="username"
                        value={ recipe?.username }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Caption:</Form.Label>
                    <Form.Control 
                        placeholder="Add a caption"
                        name="description"
                        id="description"
                        value={ recipe?.description }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>ImageUrl:</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="Will Add Photo Functionality here soon..."
                        name="imageUrl"
                        id="imageUrl"
                        value={ recipe?.imageUrl }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default recipeForm