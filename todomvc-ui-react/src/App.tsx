import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";
import { createRenderer } from "fela";
import { RendererProvider } from "react-fela";

import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

// TODO: move to it's own file with plugins
const renderer = createRenderer();

// TODO: move to it's own file
const apolloClient = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <RendererProvider renderer={renderer}>
      <ApolloProvider client={apolloClient}>
        <Header />
        <aside>
          <AddTodo />
        </aside>
        <main>
          <React.Suspense fallback={<p>Loading...</p>}>
            <TodoList />
          </React.Suspense>
        </main>
        <Footer />
      </ApolloProvider>
    </RendererProvider>
  );
}

export default App;
