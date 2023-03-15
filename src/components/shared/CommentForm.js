import { Form, Button, Container } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const CommentForm = (props) => {
    const { comment, handleChange, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            {/* <h3>{heading}</h3>
            
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is the comment's name?"
                        name="name"
                        id="name"
                        value={ comment.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                
                
            </Form> */}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <FloatingLabel controlId="floatingTextarea2" label="comment this court">
                        <Form.Control
                        name="note"
                        value={ comment.note }
                        onChange={handleChange}
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                <Button className="m-2" type="submit">Submit</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default CommentForm