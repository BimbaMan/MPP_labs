import {gql} from '@apollo/client';

export const GET_ALL_USERS = gql`
    query {
        getAllUsers {
            id, username, age
        }
    }
`

export const GET_USER_POSTS = gql`
    query getPosts($id: ID){
        getPosts(id: $id) {
            id, title, content
        }
    }
`