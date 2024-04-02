import { useEffect } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import TodoDetails from "../components/TodoDetails";
import TodoForm from "../components/TodoForm";

const Home = () => {
  const { todos, dispatch } = useTodosContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(
        "https://taskify-rest-71esifdwm-nickdane2021s-projects.vercel.app/api/todos",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TODOS", payload: json });
      }
    };

    if (user) {
      fetchTodos();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <TodoForm />
      <div className="todos">
        {todos &&
          todos.map((todo) => <TodoDetails key={todo._id} todo={todo} />)}
      </div>
    </div>
  );
};

export default Home;
