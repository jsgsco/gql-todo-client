import { Table, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { DELETE_TASK, GET_TASK } from '../../gql/task'
import { toast } from 'react-toastify'

const Tasks = (props) => {

    const { name, task, id } = props

    const [ deleteTask ] = useMutation(DELETE_TASK, {
        update(cache) {
            const { getTasksUser } = cache.readQuery({ query: GET_TASK })

            cache.writeQuery({
                query: GET_TASK,
                data: {
                    getTasksUser: getTasksUser.filter(task => task.id !== id)
                }
            })
        }
    })

    const deleteTaskId = async (id) => {
        try {
            await deleteTask({
                variables: {
                    deleteTaskId: id
                }
            })
            toast.error('Tarea eliminada!')
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <>
            <Table.Row>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{task}</Table.Cell>
                <Table.Cell>
                    <Button compact negative onClick={ () => deleteTaskId(id) }>Eliminar</Button>
                    <Button compact color='orange'>Editar</Button>
                </Table.Cell>
            </Table.Row>
        </>
     );
}
 
export default Tasks;