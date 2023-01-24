import React from "react";
import { createRenderer } from "fela";
import { RendererProvider } from "react-fela";

const renderer = createRenderer();

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [newTitle, setNewTitle] = React.useState<string>("");
  const [todos, setTodos] = React.useState<Todo[]>([]);

  const onSubmitNew = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (newTitle.length === 0) {
      return;
    }

    const sortedTodos = todos.sort((todo1, todo2) => {
      if (todo1.id > todo2.id) {
        return 1;
      } else if (todo1.id < todo2.id) {
        return -1;
      }
      return 0;
    });

    const nextId =
      sortedTodos.length > 0 ? sortedTodos[sortedTodos.length - 1].id + 1 : 1;

    setTodos([...todos, { id: nextId, title: newTitle, completed: false }]);

    setNewTitle("");
  };

  const updateStatus = (id: number, completed: boolean) => {
    const existingTodos = [...todos];

    const updatedTodoIndex = existingTodos.findIndex((todo) => todo.id === id);
    if (updatedTodoIndex === -1) {
      return;
    }

    existingTodos[updatedTodoIndex]["completed"] = completed;

    setTodos(existingTodos);
    console.log(`Updating ${id} to ${completed ? "COmplete" : "Incomplete"}`);
  };

  const deleteTodo = (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete?") === false) {
      return;
    }
    const existingTodos = [...todos];
    const deletedTodoIndex = existingTodos.findIndex((todo) => todo.id === id);
    if (deletedTodoIndex === -1) {
      return;
    }

    existingTodos.splice(deletedTodoIndex, 1);

    setTodos(existingTodos);
    console.log(`Deleting ${id}`);
  };

  return (
    <RendererProvider renderer={renderer}>
      <header>
        <h1>Todo MVC React</h1>
      </header>
      <aside>
        <form method="GET" action="/" onSubmit={onSubmitNew}>
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
      </aside>
      <main>
        <h2>Tasks</h2>
        <p>Todo items will be here</p>

        {todos.length > 0 && (
          <div>
            {todos.map((item) => (
              <article key={item.id}>
                <h3>{item.title}</h3>
                <p>Completed: {item.completed ? "Yes" : "No"}</p>
                <button
                  type="button"
                  onClick={(evt) => {
                    updateStatus(item.id, !item.completed);
                  }}
                >
                  Mark as {item.completed ? "Incomplete" : "Complet"}
                </button>
                <button type="button" onClick={(evt) => deleteTodo(item.id)}>
                  Delete
                </button>
              </article>
            ))}
          </div>
        )}

        {todos.length === 0 && <p>Nothing to do</p>}
      </main>
      <footer>Built in React with a NestJS + SQLite back-end</footer>
    </RendererProvider>
  );
}

export default App;
