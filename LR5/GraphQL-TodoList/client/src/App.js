import './styles/App.css';
import PostForm from './components/PostForm/PostForm';
import UserForm from './components/UserForm/UserForm';
import UserList from './components/List/UserList/UserList';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS } from './query/user';
import { CREATE_USER } from './mutations/user';
import { GET_USER_POSTS } from './query/user';
import PostList from './components/List/PostList/PostList';

function App() {

  const { data, loading, refetch } = useQuery(GET_ALL_USERS);
  const [newUser] = useMutation(CREATE_USER);
  const [currForm, setForm] = useState(true);
  const [currUser, setCurrUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const { data: postsData, loading: postsLoading, refetch: refetchPosts } = useQuery(GET_USER_POSTS, {
    variables: {
      id: +currUser 
    }
  });

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data])
    
  useEffect(() => {
      if(!postsLoading && postsData) {
          setPosts(postsData.getPosts ? postsData.getPosts : [])
          console.log(postsData);
      }
  },[currUser, postsData])


  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      {currForm
        ? <div>
          <UserForm setCurrUser={setCurrUser} newUser={newUser} refetch={refetch} />
          <UserList users={users} setForm={setForm} setCurrUser={setCurrUser} refetchPosts={refetchPosts}/>
        </div>
        : <div>
          <PostForm setForm={setForm} currUser={currUser} refetchPosts={refetchPosts}/>
          <PostList currUser={currUser} posts={posts} refetchPosts={refetchPosts}/>
        </div>
      }
    </div>
  );
}

export default App;
