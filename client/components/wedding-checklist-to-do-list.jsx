import React from 'react';

export default function TodoListWeddingCheckList(props) {
  // console.log(props.todos);
  return (
    props.todos.map(todo => {
      return <li className="list-group-item" key={todo.checkListId}>
        <h6 className="d-flex justify-content-between">{todo.checkListToDo}<button onClick={() => props.delete(todo)}>Delete</button></h6>
        <h6 className="text-muted font-italic">{todo.checkListCategory}</h6>
      </li>;

    })
  );
}
