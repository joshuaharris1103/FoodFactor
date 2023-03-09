import RecipeIndex from './recipes/RecipeIndex'
import { Container } from 'react-bootstrap'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<Container className='m-2' style={{textAlign: 'center'}}>
			<h2>Welcome to....</h2>
			<RecipeIndex msgAlert= { props.msgAlert} />
		</Container>
	)
}

export default Home
