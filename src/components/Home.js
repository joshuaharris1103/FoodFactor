import RecipeIndex from './recipes/RecipeIndex'
import { Container } from 'react-bootstrap'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<Container className='m-2' style={{textAlign: 'center'}}>
			<h2>Your Food Feed </h2>
			<RecipeIndex msgAlert={ props.msgAlert } user={ props.user } />
		</Container>
	)
}

export default Home
