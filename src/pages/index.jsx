import { Link } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo, deleteTodo } from "../graphql/mutations";
import { listTodos } from "../graphql/queries";
import "../App.css";

import { useState, useEffect } from "react";

const initialState = { name: "", description: "" };

const MainPage = () => {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function addTodo(e) {
    e.preventDefault();
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  async function removeTodo(e, id) {
    e.preventDefault();
    try {
      if (confirm("You sure to delete this todo?")) {
        await API.graphql(graphqlOperation(deleteTodo, { input: { id } }));
        setTodos(todos.filter((to) => to.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="container">
      <div className="formData">
        <h2>Amplify Todos</h2>
        <input
          onChange={(event) => setInput("name", event.target.value)}
          className="input"
          value={formState.name}
          placeholder="Name"
        />
        <input
          onChange={(event) => setInput("description", event.target.value)}
          className="input"
          value={formState.description}
          placeholder="Description"
        />
        <button className="button" onClick={addTodo}>
          Create Todo
        </button>
      </div>

      <div className="todoData">
        {todos.map((todo) => {
          const { id, name, description } = todo;
          return (
            <div key={id} className="todo">
              <p className="todoName">{name}</p>
              <p className="todoDescription">{description}</p>
              <Link to={`/update/${id}`} className="buttonTodo buttonUpdate">
                Update Todo
              </Link>
              <button
                className="buttonTodo buttonDelete"
                onClick={(e) => removeTodo(e, id)}
              >
                Delete Todo
              </button>
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default MainPage;
