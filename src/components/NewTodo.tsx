import React from "react";
import { TodosContext, TodoType } from "../context/TodosContext";
import { v4 as uuidv4 } from 'uuid';

interface FormState {
  newTodo: string;
  error: string;
}

const NewTodo = () => {
  const [newTodo, setNewTodo] = React.useState("");
  const [error, setError] = React.useState("");
  const [, setTodos] = React.useContext(TodosContext);

  const handleChange = (e: any) => {
    setNewTodo(e.target.value);
  };

  const handleFocus = (e: any) => {
    if (error) {
      setError("");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (newTodo) {
      setTodos((prevTodos: TodoType[]) => [...prevTodos, {id: uuidv4(), content: newTodo, state: 'todo'}]); 
      setNewTodo("");
    } else {
      setError("You have input at least 1 character");
    }
  };

  return (
    <form>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="New todo..."
          value={newTodo}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <button className="btn btn-add" onClick={handleSubmit}>
          Add
        </button>
      </div>
      {error && <p className="error-txt">{error}</p>}
    </form>
  );
};

export default NewTodo;
