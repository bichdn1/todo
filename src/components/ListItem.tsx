import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TodosContext, TodoType } from "../context/TodosContext";
import CardTodo from "./CardTodo";

interface ListItemProps {
  title: string;
  listTodo: TodoType[];
  handleTransfer: (id: string, isDelete?: boolean) => void;
  setTodos: any;
}

class ListItem extends React.Component<ListItemProps> {
  constructor(props: ListItemProps) {
    super(props);
  }

  render() {
    return (
      <div 
        className={`todo__list list--${this.props.title.toLowerCase()}`}
      >
        <h3>{this.props.title}</h3>
        <Droppable droppableId={this.props.title.toLowerCase()}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
            >
              {this.props.listTodo.map((item, idx) => (
                      <CardTodo
                        key={item.id}
                        item={item}
                        index={idx}
                        handleTransfer={this.props.handleTransfer}
                      />
                ))}
                {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

export default ListItem;
