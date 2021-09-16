import { gql } from '@apollo/client'

export const CREATE_TASK = gql`
    mutation CreateTaskMutation($createTaskInput: TaskInput) {
        createTask(input: $createTaskInput) {
            id
            name
            task
            by
        }
    }
`
export const GET_TASK = gql`
    query Query {
        getTasksUser {
            id
            name
            task
            by
        }
    }
`

export const DELETE_TASK = gql`
    mutation DeleteTaskMutation($deleteTaskId: ID!) {
        deleteTask(id: $deleteTaskId)
    }
`