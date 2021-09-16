import Tasks from '../Tasks'
import { Fragment } from 'react'
import { Table } from 'semantic-ui-react'
import { useQuery } from '@apollo/client'
import { GET_TASK } from '../../../gql/task'

import './Task.sass'

const Task = () => {

    const { data, loading } = useQuery(GET_TASK)

    if(loading) return null

    return ( 
        <Fragment>
            <Table celled className="task">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Tarea</Table.HeaderCell>
                        <Table.HeaderCell>Informacion</Table.HeaderCell>
                        <Table.HeaderCell>Acciones</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        data.getTasksUser.map(task => (
                            <Tasks 
                                key={task.id}
                                {...task}
                            />
                        ))
                    }
                </Table.Body>
            </Table>
        </Fragment>
     );
}
 
export default Task;