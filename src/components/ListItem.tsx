import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TodosContext, TodoType } from "../context/TodosContext";
import CardTodo from "./CardTodo";

interface ListItemProps {
  title: string;
  listTodo: TodoType[];
  handleTransfer: (id: string, isDelete?: boolean) => void;
}

class ListItem extends React.Component<ListItemProps> {
  constructor(props: ListItemProps) {
    super(props);
  }

  render() {
    return (
      <div className={`todo__list list--${this.props.title.toLowerCase()}`}>
        <h3>{this.props.title}</h3>
        <Droppable droppableId={`drop-${this.props.title}`}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
            >
              {this.props.listTodo.map((item, idx) => (
                  <Draggable 
                    key={item.id} 
                    draggableId={item.id} 
                    index={idx}
                  >
                    {(provided, snapshot) => (
                      <CardTodo
                        //@ts-ignore
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        item={item}
                        handleTransfer={this.props.handleTransfer}
                      />
                    )}
                  </Draggable>
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
