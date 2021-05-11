import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import { isTemplateExpression } from "typescript";
import { TodoType } from "../context/TodosContext";

interface CardTodoProps {
  item: TodoType;
  index: number;
  handleTransfer: (id: string, isDelete?: boolean) => void;
}

class CardTodo extends Component<CardTodoProps> {
  constructor(props: CardTodoProps) {
    super(props);
  }

  render() {
    return (
      <>
        <Draggable
          draggableId={this.props.item.id}
          index={this.props.index}
        >
          {(provided, snapshot) => (
            <div 
              className="todo"
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              <p>{this.props.item.content}</p>
              <div className="action">
                <span
                  className="fas fa-times-circle"
                  onClick={() =>
                    this.props.handleTransfer(this.props.item.id, true)
                  }
                ></span>
                {this.props.item.state !== "completed" && (
                  <span
                    className="fas fa-arrow-circle-right"
                    onClick={() =>
                      this.props.handleTransfer(this.props.item.id)
                    }
                  ></span>
                )}
              </div>
            </div>
          )}
        </Draggable>
      </>
    );
  }
}

export default CardTodo;
