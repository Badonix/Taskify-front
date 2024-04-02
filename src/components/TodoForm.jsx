import { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";
const TodoForm = () => {
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Log in!");
      return;
    }

    const todo = { title, description };

    const response = await fetch(
      "https://taskify-rest-71esifdwm-nickdane2021s-projects.vercel.app/api/todos",
      {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setDescription("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_TODO", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add new todo</h3>

      <label>Todo:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <button>Add</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TodoForm;
