import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

const root = ReactDOM.createRoot(document.getElementById('root'));

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
})

root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>   
);

