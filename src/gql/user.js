import { gql } from '@apollo/client'

export const REGISTER = gql`
    mutation CreateUserMutation($createUserInput: UserInput) {
        createUser(input: $createUserInput) {
            id
            name
            email
            lastname
        }
    }
`

export const LOGIN = gql`
    mutation AuthenticateUserMutation($authenticateUserInput: AuthenticateInput) {
        authenticateUser(input: $authenticateUserInput) {
            token
        }
    }
`