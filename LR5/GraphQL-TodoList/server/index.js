const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const PORT = 5000;
const users = [{id: 1, username: 'Maks', age: 25, posts: [{id: 22, title: 'pesad', content: 'saddasd'}]}, {id: 4, username: 'Lasdsad', age: 30, posts: [{id: 0, title: 'p', content: 's'}]}];

const app = express();

app.use(cors());

const createUser = (input) => {
    const id = Date.now()
    return {
        id,
        ...input,
        posts: []
    }
}

const createPost = (input) => {
    const id = Date.now();
    return {
        id,
        ...input
    }
}

const root = {
    getAllUsers: () => {
        return users;
    },
    getPosts:({id}) => {
        return users.find(user => user.id == id).posts;
    },
    createUser: ({input}) => {
        const user = createUser(input);
        users.push(user)
        return user;
    },
    createPost: ({input}) => {
        const post = createPost(input);
        users.find(user => user.id == input.id).posts.push(post);
        return post;
    },
    deletePost: ({input}) => {
        const userIndex = users.findIndex(user => user.id == input.userId);
        const postIndex = users[userIndex].posts.findIndex(post => post.id == input.postId);
        users[userIndex].posts.splice(postIndex,1);
        return input;
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))


app.listen(PORT, () => console.log(`Server started on ${PORT}`))