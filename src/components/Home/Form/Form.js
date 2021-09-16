import { Form as FormContainer, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { useMutation } from '@apollo/client'
import { CREATE_TASK, GET_TASK } from '../../../gql/task'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import './Form.sass'

const Form = () => {

    const [ createTask ] = useMutation(CREATE_TASK, {
        update(cache, { data: createTask }){
            const { getTasksUser }  = cache.readQuery({ query: GET_TASK })

            cache.writeQuery({
                query: GET_TASK,
                data: {
                    getTasksUser: [...getTasksUser, createTask]
                }
            })
        }
    })

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            name: Yup.string().required(true),
            task: Yup.string().required(true)
        }),
        onSubmit: async (formData) => {
            try {
                await createTask({
                    include: "active",
                    variables: {
                        createTaskInput: formData
                    }
                })
                toast.success('Nueva tarea agregada!')
                formik.handleReset()
            } catch (error) {
                console.log(error)
            }
        }
    })

    return ( 
        <FormContainer className="home-form" onSubmit={ formik.handleSubmit }>
            <FormContainer.Input 
                type="text"
                placeholder="Tarea"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.errors.name && true}
            />
            <FormContainer.TextArea 
                placeholder="Informacion Tarea"
                name="task"
                value={formik.values.task}
                onChange={formik.handleChange}
                error={formik.errors.task && true}
            />
            <Button 
                className="btn-submit"
                type="submit"
            >Registrar Tarea</Button>
        </FormContainer>
     );
}
 
export default Form;


function initialValues () {
    return {
        name: '',
        task: ''
    }
}