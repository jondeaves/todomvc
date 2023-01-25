import { useQuery, useMutation } from "@apollo/client";
import { useFela } from "react-fela";

import { GET_TODOS, UPDATE_TODO, DELETE_TODO } from "../../gql/todos";

import { TodoListWrapper } from "./TodoList.styles";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

// A sub-set of fields that are needed for this UI, the default
// type on error doesn't seem to include the result object of NetworkError
type GraphQLError = {
  name: string;
  networkError?: {
    name: string;
    result: {
      errors: {
        message: string;
      }[];
    };
  };
};

function TodoList() {
  const { css } = useFela();
  const {
    loading,
    error: fetchError,
    data: todosData,
  } = useQuery<{ todos: Todo[] }>(GET_TODOS);
  const [updateTodo, { error: updateError }] = useMutation(UPDATE_TODO);
  const [deleteTodo, { error: deleteError }] = useMutation(DELETE_TODO);

  // TODO: Create a Loader that is a blurred version of todo items?
  // Also move it under the header below
  if (loading) {
    return <p className={css(TodoListWrapper)}>Loading ...</p>;
  }

  // TODO: Obviously make this better
  let errorType = "fetch";
  let error = fetchError;
  if (updateError) {
    errorType = "update";
    error = updateError;
  } else if (deleteError) {
    errorType = "delete";
    error = deleteError;
  }

  // TODO: move it under the header below
  if (error) {
    return (
      <div className={css(TodoListWrapper)}>
        <h2>Couldn't {errorType} data, see below;</h2>
        <ul>
          {(error as unknown as GraphQLError).networkError?.result.errors.map(
            (error, idx) => (
              <li key={idx}>{error.message}</li>
            )
          )}
        </ul>
      </div>
    );
  }

  const todos = todosData?.todos;

  return (
    <div className={css(TodoListWrapper)}>
      <h2>Tasks</h2>
      <p>Todo items will be here</p>

      {(!todos || todos.length === 0) && <p>No tasks</p>}

      {todos && todos.length > 0 && (
        <ul className="unstyled">
          {todos.map((item) => (
            <article key={item.id}>
              <h3>{item.title}</h3>
              <p>Completed: {item.completed ? "Yes" : "No"}</p>
              <button
                type="button"
                onClick={(evt) => {
                  updateTodo({
                    variables: {
                      id: item.id,
                      title: item.title,
                      completed: !item.completed,
                    },
                  });
                }}
              >
                Mark as {item.completed ? "Incomplete" : "Complete"}
              </button>
              <button
                type="button"
                onClick={(evt) =>
                  deleteTodo({
                    variables: { id: item.id },
                    onCompleted(data, clientOptions) {
                      // TODO: This is a hacky quick fix for no re-render after delete
                      window.location.reload();
                    },
                  })
                }
              >
                Delete
              </button>
            </article>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
