const {buildSchema} = require('graphql');

const schema = buildSchema(`
    type User {
        id: ID
        username: String
        age: Int
        posts: [Post]
    }

    type Post {
        id: ID
        title: String
        content: String
    }

    type deletedPost {
        userId: ID
        postId: ID
    }

    input UserInput {
        id: ID
        username: String!
        age: Int!
        posts: [PostInput]
    }
    
    input PostInput {
        id: ID
        title: String!
        content: String!
    }
    
    input deletePostInput {
        userId: ID!
        postId: ID!
    }

    type Query {
        getAllUsers: [User]
        getPosts(id: ID): [Post]
    }

    type Mutation {
        createUser(input: UserInput): User
        createPost(input: PostInput): Post
        deletePost(input: deletePostInput): deletedPost
    }


`)

module.exports = schema;