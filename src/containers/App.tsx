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

  const itemDrag = (draggableId: string) => {
    const idx = todos.findIndex((todo: TodoType) => todo.id === draggableId);
    // if (idx >= 0) {
      const item = todos[idx];
      return [idx, item];
    // }
    // return undefined;
  }

  const findNewIndex = (destination: any, newList: TodoType[]): number => {
    if (!destination.index) {
      return 0;
    }

    let idxDrag = destination.index;
    let newIdx = -1;
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].state === destination.droppableId) {
        console.log('b'); 
        if (!--idxDrag) {
          newIdx = i + 1;
          break;
        }
      }
    }
    return newIdx;
  }

  const handleDragEnd = (result: any) => {
    const { draggableId, source, destination } = result;
    
    if (!destination) {
      return;
    }
    
    const [idx, item] = itemDrag(draggableId);
    const newList = [...todos];
    newList.splice(idx, 1);
    
    newList.splice(findNewIndex(destination, newList), 0, {...item, state: destination.droppableId});
    console.log('todos', todos);
    console.log("newList", newList);
    setTodos(newList);
  }

  return (
    <div className="App">
      <h1 className="title">Todo List</h1>
      <NewTodo />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="container-todo">
          {states.map((state: string) => {
            const listItem = todos
              ? todos.filter(
                  (todo: TodoType) => todo.state === state.toLowerCase()
                )
              : [];
            return (
                  <ListItem
                  key={state}
                  title={state}
                  listTodo={listItem}
                  handleTransfer={handleTransfer}
                  setTodos={setTodos}
                />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
