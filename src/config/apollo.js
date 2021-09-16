import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import { getToken } from '../utils/token'

const httpLink = createHttpLink({
    uri: 'https://stormy-tor-25450.herokuapp.com/'
})

const authLink = setContext((_, { headers }) => {
    
    const token = getToken()

    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ""
        }
    }
})

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat( httpLink )
})

export default client