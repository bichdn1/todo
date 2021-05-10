import React, { Component } from "react";
import { TodoType } from "../context/TodosContext";

interface CardTodoProps {
  item: TodoType;
  handleTransfer: (id: string, isDelete?: boolean) => void;
}

class CardTodo extends Component<CardTodoProps> {
  constructor(props: CardTodoProps) {
    super(props);
  }

  render() {
    return (
      <div className="todo">
        <p>{this.props.item.content}</p>
        <div className="action">
          <span
            className="fas fa-times-circle"
            onClick={() => this.props.handleTransfer(this.props.item.id, true)}
          ></span>
          {this.props.item.state !== "completed" && (
            <span
              className="fas fa-arrow-circle-right"
              onClick={() => this.props.handleTransfer(this.props.item.id)}
            ></span>
          )}
        </div>
      </div>
    );
  }
}

export default CardTodo;
