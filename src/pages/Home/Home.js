import useAuth from "../../hooks/useAuth"
import { Container, Button } from 'semantic-ui-react'
import Form from '../../components/Home/Form/Form'
import Task from '../../components/Home/Task/Task'

import './Home.sass'

const Home = () => {

    const { auth, logout } = useAuth()

    return ( 
        <Container fluid className="home">
            <h2>Hola {auth.name}, bienvenido nuevamente <Button color='google plus' icon='sign-in alternate' content='Cerrar Sesion' onClick={() => logout()} /> </h2>
            <div className="home-content">
                <div className="home-content-info">
                    <Form />
                </div>
                <div className="home-content-info">
                    <Task />
                </div>
            </div>
        </Container>
     );
}
 
export default Home;