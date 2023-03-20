import { updateTodo } from "../graphql/mutations";
import { getTodo } from "../graphql/queries";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import "../App.css";

const UpdateTodo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateTodoState, setUpdateTodoState] = useState({
    name: "",
    description: "",
  });
  async function handleUpdateSubmit(e) {
    e.preventDefault();
    try {
      await API.graphql(
        graphqlOperation(updateTodo, {
          input: {
            id: id,
            name: updateTodoState.name,
            description: updateTodoState.description,
          },
        })
      );
      setUpdateTodoState({ name: "", description: ""});

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  }

  function setInput(key, value) {
    setUpdateTodoState({ ...updateTodoState, [key]: value });
  }

  useEffect(() => {
    const fetchTodo = async () => {
      const result = await API.graphql(graphqlOperation(getTodo, { id }));
      setUpdateTodoState(result.data.getTodo);
    };
    fetchTodo();
  }, []);

  return (
    <form className="container" onSubmit={handleUpdateSubmit}>
      <div className="formData">
        <h2>Update Todo</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input"
          defaultValue={updateTodoState.name}
          onChange={(event) => setInput("name", event.target.value)}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="input"
          defaultValue={updateTodoState.description}
          onChange={(event) => setInput("description", event.target.value)}
        />
        <button className="button" type="submit">
          Update Todo
        </button>
      </div>
    </form>
  );
};

export default UpdateTodo;
