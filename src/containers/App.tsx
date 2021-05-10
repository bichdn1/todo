import React from "react";
import NewTodo from "../components/NewTodo";
import "./App.css";
import ListItem from "../components/ListItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { TodosContext, TodoType } from "../context/TodosContext";

const states = ["Todo", "Inprogress", "Completed"];

const App = () => {
  const [todos, setTodos] = React.useContext(TodosContext);

  const handleTransfer = (id: string, isDelete?: boolean) => {
    const todoTransfer = todos.find((todo: TodoType) => todo.id === id);
    if (isDelete) {
      setTodos(
        todos.map((todo: TodoType) =>
          todo.id === id ? { ...todo, state: "deleted" } : todo
        )
      );
    } else {
      const newState =
        todoTransfer.state === "todo" ? "inprogress" : "completed";
      setTodos(
        todos.map((todo: TodoType) =>
          todo.id === id ? { ...todo, state: newState } : todo
        )
      );
    }
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // const items = 
    }
  }

  return (
    <div className="App">
      <h1 className="title">Todo List</h1>
      <NewTodo />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container-todo">
          {states.map((state) => {
            const listItem = todos
              ? todos.filter(
                  (todo: TodoType) => todo.state === state.toLowerCase()
                )
              : [];
            return (
              // <Droppable droppableId={`drop-${state}`}>
                // {(provided: any) => (
                  <ListItem
                  key={state}
                  title={state}
                  listTodo={listItem}
                  handleTransfer={handleTransfer}
                  // {...provided.dropableProps}
                  // ref={provided.innerRef}
                />
                // )}
              // {/* </Droppable> */}
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
