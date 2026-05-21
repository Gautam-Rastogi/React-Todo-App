import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import TodoCard from "./TodoCard";

const API_URL =
  "https://todos-14884-default-rtdb.asia-southeast1.firebasedatabase.app/";
function App() {
  let taskInput = useRef(null);
  let [taskStatus, setTaskStatus] = useState(false);
  let [todo, setTodo] = useState([]);

  function submitHandler() {
    setTaskStatus(true);
    axios
      .post(`${API_URL}/todos.json`, {
        title: taskInput.current.value,
        completed: false,
      })
      .then((res) => {
        fetchHandler();
        setTaskStatus(false);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchHandler() {
    axios
      .get(`${API_URL}/todos.json`)
      .then((res) => {
        let tempTodos = [];
        for (let key in res.data) {
          let todo = {
            id: key,
            ...res.data[key],
          }
          tempTodos.push(todo);
        }
        setTodo(tempTodos);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteHandler(id) {
    axios
      .delete(`${API_URL}/todos/${id}.json`)
      .then((res) => {
        fetchHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchHandler();
  }, []);
  return (
    <>
      <h1 className="text-xl px-2 mt-3 pb-2 border-b-1">Todo App</h1>
      <div className="w-96 mx-auto mt-10 px-4">
        <h1 className="text-center text-xl font-bold mt-12">
          Manage all your tasks
        </h1>
        <p className="text-center text-gray-700 mt-1">
          Organize your work and life with our simple and intuitive todo app.
        </p>
        <input
          type="text"
          placeholder="Add a new task..."
          className=" w-full mt-3 border border-gray-500 rounded-xl py-2 px-4 focus:outline-none focus:shadow-2xl "
          ref={taskInput}
        />
        <button
          onClick={submitHandler}
          className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-2xl mt-3 flex items-center justify-center gap-2"
        >
          {taskStatus ? <>Adding...{<Loader />}</> : "Add Task"}
        </button>
      </div>

      <div className="mt-12 w-[400px] mx-auto mb-5">
        {todo.map((todo) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onDelete={deleteHandler}
          />
        ))}
      </div>
    </>
  );
}

export default App;
