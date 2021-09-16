import * as Yup from 'yup'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../../gql/user'
import { setToken, decodeToken } from '../../../utils/token'
import useAuth from '../../../hooks/useAuth'

import './Login.sass'

const Login = () => {

    const [ authenticateUser ] = useMutation(LOGIN)
    const { setUser } = useAuth()
    

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            email: Yup.string().email().required(true),
            password: Yup.string().required(true)
        }),
        onSubmit: async (formData) => {
            try {
                const data = await authenticateUser({
                    variables: {
                        authenticateUserInput: formData
                    }
                })
                const { token } = data.data.authenticateUser
                setToken(token)
                setUser(decodeToken(token))
            } catch (error) {
                toast.error(error.message)
            }
        }
    })

    return ( 
        <Form className="login-form" onSubmit={ formik.handleSubmit }>
            <h2>Ingresa para administrar tus tareas.</h2>
            <Form.Input 
                    type="text"
                    placeholder="Correo electronico"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email && true}
                />
                <Form.Input 
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password && true}
                />
                <Button type="submit" className="btn-submit">Iniciar Sesion</Button>
        </Form>
     );
}
 
export default Login;

function initialValues () {
    return {
        email: '',
        password: ''
    }
}