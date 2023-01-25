import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query {
    todos {
      id
      title
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: Int!, $title: String!, $completed: Boolean!) {
    updateTodo(
      updateTodoInput: { id: $id, title: $title, completed: $completed }
    ) {
      id
      title
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    removeTodo(id: $id) {
      id
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    createTodo(createTodoInput: { title: $title }) {
      id
      title
      completed
    }
  }
`;
