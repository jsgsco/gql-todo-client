import * as Yup from 'yup'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'

import { useMutation } from '@apollo/client'
import { REGISTER } from '../../../gql/user'

import './Registar.sass'

const Register = (props) => {

    const { setshowLogin } = props

    const [ createUser ] = useMutation(REGISTER)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            name: Yup.string().required(true),
            lastname: Yup.string().required(true),
            email: Yup.string().email().required(true),
            password: Yup.string().required(true).oneOf([Yup.ref('repeatpassword')]),
            repeatpassword: Yup.string().required(true).oneOf([Yup.ref('password')])
        }),
        onSubmit: async (formData) => {
            try {
                const newUser = formData
                delete newUser.repeatpassword

                await createUser({
                    variables: {
                        createUserInput: newUser
                    }
                })
                toast.success('Usuario creado con exito!')
                setshowLogin(true)
            } catch (error) {
                toast.error(error.message)
                console.log(error)
            }
        }
    })

    return ( 
        <>
            <h2 className="register-form-title">Registrate para empezar a crear tareas.</h2>
            <Form className="register-form" onSubmit={ formik.handleSubmit }>
                <Form.Input 
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.errors.name && true}
                />
                <Form.Input 
                    type="text"
                    placeholder="Apellido"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    error={formik.errors.lastname && true}
                />
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
                <Form.Input 
                    type="password"
                    placeholder="Repite tu Contraseña"
                    name="repeatpassword"
                    value={formik.values.repeatpassword}
                    onChange={formik.handleChange}
                    error={formik.errors.repeatpassword && true}
                />
                <Button className="btn-submit" type="submit">Registrarme</Button>
            </Form>
        </>
     );
}
 
export default Register;


function initialValues () {
    return {
        name: '',
        lastname: '',
        email: '',
        password: '',
        repeatpassword: ''
    }
}