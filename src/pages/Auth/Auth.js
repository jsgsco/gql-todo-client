import { useState } from "react"
import { Container } from 'semantic-ui-react'
import Register from '../../components/Auth/Register/Register'
import Login from '../../components/Auth/Login/Login'

import "./Auth.sass"

const Auth = () => {

    const [showLogin, setshowLogin] = useState(true)

    return ( 
        <Container fluid className="auth">
            <div className="container-form">
                {showLogin ? <Login /> : <Register setshowLogin={setshowLogin}/>}
            </div>

            <div className="change-form">
                <p>
                    {showLogin ? (
                        <>
                            ¿No tienes cuenta?
                            <span onClick={ () => setshowLogin(!showLogin) }>Registrate</span>
                        </>
                    ) : (
                        <>
                            ¡Entra con tu cuenta!
                            <span onClick={ () => setshowLogin(!showLogin) }>Iniciar sesion</span>
                        </>
                    )}
                </p>
                
            </div>
        </Container>
     );
}
 
export default Auth;