import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($input: UserInput) {
    createUser(input: $input) {
      id
      username
      age
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($input: PostInput) {
    createPost(input: $input) {
      title
      content
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($input: deletePostInput) {
    deletePost(input: $input) {
      userId
      postId
    }
  }
`;
