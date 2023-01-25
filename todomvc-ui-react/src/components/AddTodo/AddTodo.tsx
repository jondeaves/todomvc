import React from "react";
import { useMutation } from "@apollo/client";
import { useFela } from "react-fela";

import { ADD_TODO } from "../../gql/todos";

import { AddTodoWrapper } from "./AddTodo.styles";

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

function AddTodo() {
  const { css } = useFela();
  const [newTitle, setNewTitle] = React.useState<string>("");
  const [addTodo, { error }] = useMutation(ADD_TODO);

  // TODO: move it under the header below
  if (error) {
    return (
      <div className={css(AddTodoWrapper)}>
        <h2>Couldn't create todo, see below;</h2>
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

  const onSubmitNew = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (newTitle.length === 0) {
      return;
    }

    addTodo({
      variables: {
        title: newTitle,
      },
      onCompleted(data, clientOptions) {
        window.location.reload();
      },
    });
  };

  return (
    <form
      method="GET"
      action="/"
      onSubmit={onSubmitNew}
      className={css(AddTodoWrapper)}
    >
      <h2>Add new task</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title..."
          value={newTitle}
          onChange={(evt) => setNewTitle(evt.currentTarget.value)}
        />
      </div>
      <button type="submit">Add task</button>
    </form>
  );
}

export default AddTodo;
