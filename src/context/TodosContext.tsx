import React, { createContext } from 'react';

export interface TodoType {
  id: string;
  content: string;
  state: string;
}

export const TodosContext = createContext<any>({});

const TodosProvider = (props: any) => {
  const [todos, setTodos] = React.useState<TodoType[]>([]);

  return (
    <TodosContext.Provider value={[todos, setTodos]}>
      {props.children}
    </TodosContext.Provider>
  )
}

export default TodosProvider;