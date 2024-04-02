import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";
// date fns

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval + " y ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " month ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " d ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " h ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " m ago";
  }
  return Math.floor(seconds) + " s ago";
}

const TodoDetails = ({ todo }) => {
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      "https://taskify-rest-71esifdwm-nickdane2021s-projects.vercel.app/api/todos/" +
        todo._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
    }
  };

  return (
    <div className="todo-details">
      <h4>{todo.title}</h4>
      <p className="description">
        <strong>Description: </strong>
        {todo.description}{" "}
      </p>
      <p className="date">{timeAgo(todo.createdAt)}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        Delete
      </span>
    </div>
  );
};

export default TodoDetails;
